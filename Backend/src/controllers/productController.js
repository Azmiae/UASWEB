const {Product, Transaction} = require('../models');
const {Op} = require('sequelize');

const tambahProduk = async (req, res) => {
  const { name, stock } = req.body;

  try {
    if (!name || stock === undefined) {
      return res.status(400).json({ message: 'Data tidak lengkap' });
    }

    const product = await Product.create({ name, stock });

    res.status(201).json({
      message: 'Produk berhasil ditambahkan',
      product
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal menambahkan produk' });
  }
};

const updateProduct = async (req,res) => {
   const {id} = req.params;
   try {
    const product = await Product.findByPk(id);
    if (!product) {
        return res.status(404).json({ message: 'Produk tidak ditemukan' });
    }
    await product.update(req.body);
    res.status(200).json({
        message: 'Produk berhasil diperbarui',
        product
    });
   } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal memperbarui produk' });
   }
};

const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }
        await product.destroy();
        res.status(200).json({ message: 'Produk berhasil dihapus' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal menghapus produk' });
    }
};

const getProducts = async(req, res) => {
    try {
        const { page = 1, limit = 10, search = '' } = req.query;

        const where = search
            ? { name: { [Op.like]: `%${search}%` } }
            : {};
        
        const { count, rows: products } = await Product.findAndCountAll({
            where,
            limit: parseInt(limit),
            offset: (page - 1) * limit
        });

        res.status(200).json({
            total: count,
            page: parseInt(page),
            products
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil produk' });
    }
};
module.exports = { tambahProduk, updateProduct, deleteProduct, getProducts };