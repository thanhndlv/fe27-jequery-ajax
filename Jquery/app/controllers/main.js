$(document).ready(function () {
  var danhSachNguoiDung = new DanhSachNguoiDung();

  getLocalStorage();

  $("#btnThemNguoiDung").click(function () {
    var title = "Thêm người dùng";
    var footer = "<button id='btnThem' class='btn btn-success'>Thêm</button>";

    $(".modal-title").html(title);
    $(".modal-footer").html(footer);
  });
  function showPopUp(title, ttlBtn, idBtn) {
    var ttl = title;
    var footer = ` <button id="${idBtn}" class="btn btn-success">${ttlBtn}</button>
                   <button class="btn btn-danger" data-dismiss="modal">Đóng</button>`;
    $('.modal-title').html(ttl);
    $('.modal-footer').html(footer);
  }
  $("#btnThemNguoiDung").click(function () {
    showPopUp("Thêm người dùng", "Thêm", "btnThem");
    $("#TaiKhoan").removeAttr("disabled");
  });
  $("body").delegate(".btnSua", "click", function () {
    showPopUp("Sửa người dùng", "Cập nhật", "btnCapNhat");
  });

  $("body").delegate("#btnThem", "click", function () {
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();

    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT);
    danhSachNguoiDung.themNguoiDung(nguoiDung);

    taoBang();
    setLocalStorage();
  });

  function taoBang() {
    var tbody = $("#tblDanhSachNguoiDung");
    var content = "";
    // for (var i = 0; i < danhSachNguoiDung.mangNguoiDung.length; i++) {
    //   content += `
    //         <tr>
    //             <td>${i + 1}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].taiKhoan}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].matKhau}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].hoTen}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].email}</td>
    //             <td>${danhSachNguoiDung.mangNguoiDung[i].soDT}</td>
    //         </tr>
    //     `;
    // }

    danhSachNguoiDung.mangNguoiDung.map(function (item, index) {
      content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>
                    <button class="btn btn-primary btnSua" data-toggle="modal" data-target="#myModal" data-taikhoan="${item.taiKhoan}">Sửa</button>
                    <button class="btn btn-danger btnXoa" data-taikhoan="${item.taiKhoan}">Xóa</button>
                </td>
            </tr>
        `;
    });

    tbody.html(content);
  }
  // function layViTri(id) {
  //   for (var i = 0; i < danhSachNguoiDung.length; i++) {
  //     var tk = danhSachNguoiDung[i];
  //     if (tk.taiKhoan === id) {
  //       return i;
  //     }
  //   }
  //   return -1;
  // }
  // function xoaNguoiDung(event) {
  //   var btnXoa = event.target;
  //   console.log(btnXoa);
  //   var idXoa = btnXoa.getAtribute("data-id");
  //   var index = layViTri(idXoa);
  //   danhSachNguoiDung.splice(index, 1);
  //   taoBang(danhSachNguoiDung);
  // }
  $("body").delegate(".btnXoa", "click", function () {
    var taiKhoan = $(this).data("taikhoan");
    danhSachNguoiDung.xoaNhanVien(taiKhoan);
    taoBang(danhSachNguoiDung.mangNguoiDung);
    setLocalStorage();
  });
  $("body").delegate(".btnSua", "click", function () {
    var taiKhoan = $(this).data("taikhoan");
    var nguoiDung = danhSachNguoiDung.layThongTinNguoiDung(taiKhoan);
    $("#TaiKhoan").val(nguoiDung.taiKhoan);
    $("#TaiKhoan").attr("disabled", true);
    $("#HoTen").val(nguoiDung.hoTen);
    $("#MatKhau").val(nguoiDung.matKhau);
    $("#Email").val(nguoiDung.email);
    $("#SoDienThoai").val(nguoiDung.soDT);
  });
  $("body").delegate("#btnCapNhat", "click", function () {
    var taiKhoan = $("#TaiKhoan").val();
    var hoTen = $("#HoTen").val();
    var matKhau = $("#MatKhau").val();
    var email = $("#Email").val();
    var soDT = $("#SoDienThoai").val();
    var nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT);
    danhSachNguoiDung.capNhatNguoiDung(nguoiDung);
    taoBang();
    setLocalStorage();
  });
  $("body").delegate("#search").on("keyup", function () {
    taoBang(mangNhanVienTimKiem);
  });

  function setLocalStorage() {
    localStorage.setItem(
      "mangNguoiDung",
      JSON.stringify(danhSachNguoiDung.mangNguoiDung)
    );
  }

  function getLocalStorage() {
    if (localStorage.getItem("mangNguoiDung")) {
      danhSachNguoiDung.mangNguoiDung = JSON.parse(
        localStorage.getItem("mangNguoiDung")
      );
      taoBang();
    }
  }
});
