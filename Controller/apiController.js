

module.exports.home = async (req,res) => {
    try {
        res.render('index')
    } catch (error) {
        return res.status(500).send(error)
    }
}