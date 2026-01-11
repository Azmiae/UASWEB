const {Product, Transaction} = require('../models');

exports.masuk = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
    return res.status(400).json({ message: 'Data tidak lengkap' });
  }

  const product = await Product.findByPk(productId);
  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  product.stock += quantity;
  await product.save();
  await Transaction.create({
    productId,
    quantity,
    type:'masuk',
    userId: req.user.id
});
  

  res.json({
    message: 'Transaksi masuk berhasil',
    product
  });
};



exports.keluar = async (req, res) => {
  const { productId, quantity } = req.body;

  if (!productId || quantity <= 0) {
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
  await Transaction.create({
    productId,
    quantity,
    type: 'keluar',
    userId: req.user.id
  });

  res.json({
    message: 'Transaksi keluar berhasil',
    product
  });
};

exports.getTransactions = async (req, res) => {
    const data = await Transaction.findAll({
        include: {
        model: Product,
        attributes: ['id','name']
        },
        order:[['createdAt','DESC']]
    });
    res.json({
        data
    });
}

exports.deleteTransaksi = async (req, res) => {
  const { id } = req.params;

  const transaksi = await Transaction.findByPk(id);
  if (!transaksi) {
    return res.status(404).json({ message: 'Transaksi tidak ditemukan' });
  }

  const product = await Product.findByPk(transaksi.productId);
  if (!product) {
    return res.status(404).json({ message: 'Produk tidak ditemukan' });
  }

  if (transaksi.type === 'masuk') {
    product.stock -= transaksi.quantity;
  } else if (transaksi.type === 'keluar') {
    product.stock += transaksi.quantity;
  }

  if (product.stock < 0) {
    return res.status(400).json({
      message: 'Stok menjadi negatif, transaksi tidak boleh dihapus'
    });
  }

  await product.save();
  await transaksi.destroy();

  res.json({
    message: 'Transaksi berhasil dihapus',
    stock: product.stock
  });
};
