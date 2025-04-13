const { Op } = require('sequelize');
const Task = require('../models/task');

exports.createTask = async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, UserId: req.user.id });
    res.status(201).json({ message: 'Tarea creada exitosamente', task });
  } catch (err) {
    res.status(400).json({ error: 'Error creando tarea' });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { status, search, from, to, createdFrom, createdTo } = req.query;

    console.log('🔥 QUERY RECIBIDA:', req.query);

    const where = {
      UserId: req.user.id,
    };

    if (status) {
      where.status = status;
    }

    if (search) {
      where[Op.or] = [
        { title: { [Op.iLike]: `%${search}%` } },
        { description: { [Op.iLike]: `%${search}%` } },
      ];
    }

    const filters = [];

    if (from) {
      const fromDate = new Date(`${from}T00:00:00`);
      if (!isNaN(fromDate.getTime())) {
        filters.push({ dueDate: { [Op.gte]: fromDate } });
        console.log('🟦 FROM CORREGIDO:', fromDate.toISOString());
      }
    }

    if (to) {
      const toDate = new Date(`${to}T23:59:59`);
      if (!isNaN(toDate.getTime())) {
        filters.push({ dueDate: { [Op.lte]: toDate } });
        console.log('🟩 TO CORREGIDO:', toDate.toISOString());
      }
    }

    if (createdFrom) {
      const date = new Date(`${createdFrom}T00:00:00`);
      if (!isNaN(date.getTime())) {
        filters.push({ createdAt: { [Op.gte]: date } });
      }
    }

    if (createdTo) {
      const date = new Date(`${createdTo}T23:59:59`);
      if (!isNaN(date.getTime())) {
        filters.push({ createdAt: { [Op.lte]: date } });
      }
    }

    // ✅ Aplica cada filtro individualmente al WHERE
    for (const condition of filters) {
      Object.entries(condition).forEach(([key, value]) => {
        if (!where[key]) {
          where[key] = value;
        } else {
          where[key] = {
            [Op.and]: [where[key], value],
          };
        }
      });
    }

    console.log('✅ Filtro WHERE final:', where);

    const tasks = await Task.findAll({ where });
    res.json(tasks);
  } catch (err) {
    console.error('❌ Error en getTasks:', err);
    res.status(500).json({ error: 'Error obteniendo tareas' });
  }
};

exports.getTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: 'Error' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!task) return res.status(404).json({ message: 'Tarea no encontrada' });

    if (task.status === 'completada') {
      return res.status(403).json({ message: 'No se puede modificar una tarea completada' });
    }

    if (req.body.status === 'pendiente' && task.status !== 'pendiente') {
      return res.status(403).json({ message: 'No se puede volver a pendiente' });
    }

    if (req.body.status === 'completada' && task.status !== 'en progreso') {
      return res.status(403).json({ message: 'Solo se puede completar desde "en progreso"' });
    }

    await task.update(req.body);
    res.json({ message: 'Tarea actualizada', task });
  } catch (err) {
    res.status(400).json({ error: 'Error actualizando tarea' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findOne({ where: { id: req.params.id, UserId: req.user.id } });
    if (!task || task.status !== 'completada') {
      return res.status(403).json({ message: 'Solo puedes eliminar tareas completadas' });
    }
    await task.destroy();
    res.json({ message: 'Tarea eliminada' });
  } catch (err) {
    res.status(500).json({ error: 'Error eliminando tarea' });
  }
};
