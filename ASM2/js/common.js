const urlserver = `http://localhost:3000`;
const tygia = 25000;
class CSan_Pham {
    id;
    ten;
    gia;
    gia_km;
    hinh;
    ngay;
    xem;
    hot;
    an_hien;
    tinh_chat;
    mau_sac;
    can_nang;
    id_nhasx;
    constructor(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx) {
        this.id = id;
        this.ten = ten;
        this.gia = gia;
        this.gia_km = gia_km;
        this.hinh = hinh;
        this.ngay = ngay;
        this.xem = xem;
        this.hot = hot;
        this.an_hien = an_hien;
        this.tinh_chat = tinh_chat;
        this.mau_sac = mau_sac;
        this.can_nang = can_nang;
        this.id_nhasx = id_nhasx;
    }
    phantramgia() {
        return ((100 * (this.gia - this.gia_km) / this.gia).toFixed(0) + "%");
    }
    giavnd() {
        return (Number(this.gia).toLocaleString("vi") + "VND");
    }
    giakm() {
        return (Number(this.gia_km).toLocaleString("vi") + "VND");
    }
    giausd() {
        return (Number(this.gia / tygia).toFixed(0) + "USD");
    }
}
class CLapTop extends CSan_Pham {
    ram;
    cpu;
    dia;
    man_hinh;
    thong_tin_pin;
    cong_nghe_man_hinh;
    cong_ket_noi;
    constructor(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx, ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi) {
        super(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, id_nhasx);
        this.ram = ram;
        this.cpu = cpu;
        this.dia = dia;
        this.man_hinh = man_hinh;
        this.thong_tin_pin = thong_tin_pin;
        this.cong_nghe_man_hinh = cong_nghe_man_hinh;
        this.cong_ket_noi = cong_ket_noi;
    }
}
var TINH_CHAT;
(function (TINH_CHAT) {
    TINH_CHAT["BINH THUONG"] = "1";
    TINH_CHAT["GIA RE"] = "2";
    TINH_CHAT["GIAM SOC"] = "3";
    TINH_CHAT["CAO CAP"] = "4";
})(TINH_CHAT || (TINH_CHAT = {}));
var MAU_SAC;
(function (MAU_SAC) {
    MAU_SAC["DEN"] = "\u0110en";
    MAU_SAC["TRANG"] = "Tr\u1EAFng";
    MAU_SAC["XAM"] = "X\u00E1m";
    MAU_SAC["VANG"] = "V\u00E0ng";
    MAU_SAC["BAC"] = "B\u1EA1c";
    MAU_SAC["XANH"] = "Xanh";
})(MAU_SAC || (MAU_SAC = {}));
export { urlserver, tygia, CLapTop, CSan_Pham, TINH_CHAT, MAU_SAC };
