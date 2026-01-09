const login = (req, res) =>  {
    const {email,password} =req.body;

    //Basic Validation
    if(!email || !password){
        return res.status(400).json({
            message: 'Email dan password dibutuhkan'});
        }



        res.json({ message: ' Input Valid'});
    };

module.exports = {
    login
        };