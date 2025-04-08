const { registerUsuario } = require('../controllers/authController');

test('Debe registrar un usuario correctamente', async () => {
    const req = { body: { nombre: 'Test', contraseña: '123456' } };
    const res = { json: jest.fn() };
    await registerUsuario(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ nombre: 'Test' }));
});