module.exports.index = (req,res) => {
    res.render("admin/pages/home/index.pug",{
        titlePage : "Trang chủ",
    });
}

