router.post(
    '/',
    authmiddleware,
    authorizeRole('admin', 'staff'),
    productController.createProducts
);