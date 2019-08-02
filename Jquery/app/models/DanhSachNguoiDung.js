function DanhSachNguoiDung() {
  this.mangNguoiDung = [];

  this.themNguoiDung = function (nguoiDung) {
    this.mangNguoiDung.push(nguoiDung);
  };
  this.layThongTinNguoiDung = function (taiKhoan) {
    return this.mangNguoiDung.find(function (item) {
      return taiKhoan === item.taiKhoan;
    });
  }
  this.capNhatNguoiDung = function (nguoiDung) {
    this.mangNguoiDung.map(function (item) {
      if (nguoiDung.taiKhoan === item.taiKhoan) {
        item.taiKhoan = nguoiDung.taiKhoan;
        item.hoTen = nguoiDung.hoTen;
        item.matKhau = nguoiDung.matKhau;
        item.email = nguoiDung.email;
        item.soDT = nguoiDung.soDT;
      }
    });
  };
}
DanhSachNguoiDung.prototype.xoaNhanVien = function (taiKhoan) {
  let viTri = this.mangNguoiDung.findIndex(function (item) {
    return taiKhoan === item.taiKhoan;
  });
  this.mangNguoiDung.splice(viTri, 1);
}