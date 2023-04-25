let items = require("../items");
const { v4:uuidv4} = require("uuid");
const getItems = (req, replay) => {
  replay.send(items);
};

const getItem = (req, replay) => {
  const { id } = req.params;
  const item = items.find((item) => item.id === +id);
  replay.send(item);
};

const addItem = (req, replay) => {
  const { name } = req.body;
  const item = {
    id: uuidv4(),
    name,
  };
  items = [...items, item];
  replay.code(201).send(item);
};

const deleteItem = (req, replay) => {
  const { id } = req.params;
  items = items.filter((item) => item.id !== id);
  replay.code(204).send({ message: "Item deleted" });
}

const updateItem = (req, replay) => {
  const { id } = req.params;
  const { name } = req.body;
  const item = items.map((item) => item.id === id ? { id, name } : item);
  item = item.indexOf(item.find((item) => item.id === id));
  replay.code(200).send(item);
};

module.exports = {
  getItems,
  getItem,
  addItem,
  deleteItem,
  updateItem
};
