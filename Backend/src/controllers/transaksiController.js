const Product = require('../models/Product');

exports.masuk = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  product.stock += quantity;
  await product.save();

  res.json({
    message: 'Transaksi masuk berhasil',
    product
  });
};


const Product = require('../models/Product');

exports.keluar = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || !quantity) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const product = await Product.findByPk(productId);

  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  if (product.stock < quantity) {
    return res.status(400).json({ message: 'Stok tidak mencukupi' });
  }

  product.stock -= quantity;
  await product.save();

  res.json({
    message: 'Transaksi keluar berhasil',
    product
  });
};
