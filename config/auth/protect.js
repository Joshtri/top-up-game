// protect.js

const protect = (req, res, next) => {
    if (req.session.admin) {
        // Tampilkan data admin dari session di console
        console.log('Data admin:', req.session.admin);
        // Jika admin sudah login, lanjutkan ke middleware berikutnya atau ke endpoint yang diminta
        next();
    } else {
        // Jika admin belum login, redirect ke halaman login
        res.redirect('/9769afd85e49be6742d8ec054e67649aa60155f7f346c7ef23779d44ef32dee4');
        console.log('Anda harus login terlebih dulu');
    }
  };
  
  export default protect;
  