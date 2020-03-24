const conncetion = require('../database/connection');

module.exports = {
  async index(req,res) {
    const { pages = 1 } = req.query;

    const [count] = await conncetion('incidents').count();

    const incidents = await conncetion('incidents')
    .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
    .limit(5)
    .offset((pages - 1)*5)
    .select([
      'incidents.*',
      'ongs.name',
      'ongs.email',
      'ongs.whatsapp',
      'ongs.city',
      'ongs.uf',
  ]);

    res.header('X-Total-Count', count['count(*)'])

    return res.json(incidents)
  },

  async create(req, res) {
    const { title, description, value } = req.body;

    const ong_id = req.headers.authorization;

    const [ id ] = await conncetion('incidents').insert({
      title,
      description,
      value,
      ong_id,
    })

    return res.json({ id });
  },

  async delete(req, res) {
    const { id } = req.params;
    const ong_id = req.headers.authorization;

    const incident = await conncetion('incidents')
      .where('id', id)
      .select('ong_id')
      .first();

    if(incident.ong_id !== ong_id) {
      return res.status(401).json({ error: 'Operation not permited' })
    }

    await conncetion('incidents').where('id',id).delete();

    return res.json({ message: 'Incident deleted' });
  }
};