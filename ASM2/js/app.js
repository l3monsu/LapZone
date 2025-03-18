import { urlserver, CLapTop, CSan_Pham } from './common.js';
export const lay_nha_sx = async () => {
    let data = await fetch(urlserver + "/nha_sx").then(res => res.json()).then(data => data);
    let str = ` 
    <li class="nav-item">
    <a class="nav-link active" aria-current="page" href="/">Home</a>
     </li>`;
    data.forEach(nsx => {
        str += `
       <li class="nav-item">
        <a class="nav-link active" aria-current="page" href="sptheonhasx.html?id=${nsx.id}">${nsx.ten}</a>
      </li>`;
    });
    return str;
};
export const layspmoi = async (sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json().then(data => data));
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = `
  <div id='spmoi' class='listsp'>
      <h2> San Pham Moi</h2>
      <div id='data'>${str}</div>
  </div>
  `;
    return str;
};
export const laysphot = async (sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?hot=1&_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json().then(data => data));
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = `
    <div id='spnoibat' class='listsp'>
        <h2> San Pham Noi Bat</h2>
        <div id='data'>${str}</div>
    </div>
    `;
    return str;
};
const motsp = (sp) => {
    let { id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang } = sp;
    let obj;
    obj = new CSan_Pham(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, hinh);
    return `
    <div class="sp">
    <h4> <a href='sp.html?id=${sp.id}'>${sp.ten}</a></h4>
    <img src="${obj.hinh}">
    <p>Gia Goc:${obj.giavnd()} &nbsp; (${obj.giausd()})</p>
    <p>Gia Ban:${obj.giakm()} &nbsp; (${obj.phantramgia()})</p>
    </div>
    `;
};
export const lay_sp_theo_nhasx = async (id_nhasx, sosp = 6) => {
    let data = await fetch(urlserver + `/san_pham/?id_nhasx=${id_nhasx}&_sort=-ngay&_limit=${sosp}`)
        .then(res => res.json()).then(data => data);
    let str = ``;
    data.forEach(sp => str += motsp(sp));
    str = `
    <div id='sptheonhasx' class='listsp'>
        <h2> San Pham cua nha san xuat</h2>
        <div id='data'>${str}</div>
    </div>
    `;
    return str;
};
export const lay1sp = async (id = 0) => {
    let sp = await fetch(urlserver + `/san_pham/?id=${id}`).then(res => res.json()).then(data => data[0]);
    let tt = await fetch(urlserver + `/thuoc_tinh/?id_sp=${id}`).then(res => res.json()).then(d => d[0]);
    let { ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang } = sp;
    let { ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi } = tt;
    let obj = new CLapTop(id, ten, gia, gia_km, hinh, ngay, xem, hot, an_hien, tinh_chat, mau_sac, can_nang, hinh, ram, cpu, dia, man_hinh, thong_tin_pin, cong_nghe_man_hinh, cong_ket_noi);
    let str = `
    <div id='left'><img src='${obj.hinh}'></div>
      <div id='middle'>
      <h4> ${obj.ten}</h4>
      <p>Gia Goc:${obj.giavnd()} &nbsp; (${obj.giausd()})</p>
      <p>Gia Ban:${obj.giakm()} Giam (${obj.phantramgia()})</p>
      <p> Mau sac: ${obj.mau_sac}</p>
      <p> Can nang: ${obj.can_nang}</p>
      <p> CPU: ${obj.cpu}</p>
      <button class='btn btn-primary'>Add to cart</button>
    </div>

    <div id='right'>
      <p> RAM: ${obj.ram}</p>
      <p> Dia: ${obj.dia}</p>
      <p> Man hinh: ${obj.man_hinh}</p>
      <p> Thong tin pin: ${obj.thong_tin_pin}</p>
      <p> Thong tin man hinh: ${obj.cong_nghe_man_hinh}</p>
      <p> Cong ket noi: ${obj.cong_ket_noi}</p>
      </div>
      `;
    str = `<div id='chitietsp'>
      <h2> Chi tiet san pham</h2>
      <div id='data'>${str}</div>
    </div>`;
    return str;
};
