const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) => { // MÉTODO QUE PIDE UNA CONEXIÓN A MYSQL
        conn.query('SELECT * FROM customer', (err, customers) => { // QUERY, PARA REALIZAR UNA CONSULTA
            if (err) {
                res.json(err);
                // next(err); // MÁS PROFESIONAL
            }
            res.render('customers', { // SE RENDERIZA EL EJS
                data: customers
            })
        })
    })
};

controller.save = (req, res) => {
    const data = req.body
    console.log(req.body);
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO customer set ?', [data], (err, customer) => {
            res.redirect('/')
        });
    });
};

controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM customer WHERE id = ?', [id], (err, customer) => {
            res.render('customer_edit', {
                data: customer[0]
            });
        });
    });
};

controller.update = (req, res) => {
    const { id } = req.params;
    const newCustomer = req.body;
    req.getConnection((err, conn) => {
        conn.query('UPDATE customer set ? WHERE id = ?', [newCustomer, id], (err, rows) => {
            res.redirect('/')
        });
    });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
        conn.query('DELETE FROM customer WHERE id = ?', [id], (err, rows) => {
            res.redirect('/')
        });
    });
};

module.exports = controller;