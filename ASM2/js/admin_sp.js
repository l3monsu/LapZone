import { urlserver, TINH_CHAT, MAU_SAC, } from "./common.js";
export const form_them_sp = async () => {
    let nha_sx_arr = await lay_nsx();
    let nsx_options = ``;
    nha_sx_arr.forEach(nsx => nsx_options += `<option value='${nsx.id}'>${nsx.ten}</option>`);
    let mausac_options = ``;
    for (const key in MAU_SAC) {
        mausac_options += `<option value='${MAU_SAC[key]}'>${key}</option>`;
    }
    let tinhchat_options = ``;
    for (const key in TINH_CHAT) {
        tinhchat_options += `<option value='${TINH_CHAT[key]}'>${key} </option>`;
    }
    return `<form class="container border border-primary p-3 rounded">
    <div class="row mb-3">
        <div class="col-md-6">
            <label for="ten" class="form-label">Tên SP</label>
            <input id="ten" class="form-control border-primary" type="text">
        </div>
        <div class="col-md-6">
            <label for="ngay" class="form-label">Ngày</label>
            <input id="ngay" class="form-control border-primary" type="date">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <label for="gia" class="form-label">Giá gốc</label>
            <input id="gia" class="form-control border-primary" type="number">
        </div>
        <div class="col-md-6">
            <label for="gia_km" class="form-label">Giá KM</label>
            <input id="gia_km" class="form-control border-primary" type="number">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <label for="hinh" class="form-label">Hình</label>
            <input id="hinh" class="form-control border-primary" type="text">
        </div>
        <div class="col-md-6">
            <label for="xem" class="form-label">Lượt xem</label>
            <input id="xem" class="form-control border-primary" type="number">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <label for="tinh_chat" class="form-label">Tính chất</label>
            <select id="tinh_chat" class="form-select border-primary">
                ${tinhchat_options}
            </select>
        </div>
        <div class="col-md-6">
            <label for="mau_sac" class="form-label">Màu sắc</label>
            <select id="mau_sac" class="form-select border-primary">
                ${mausac_options}
            </select>
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <label for="id_nha_sx" class="form-label">Nhà sản xuất</label>
            <select id="id_nha_sx" class="form-select border-primary">
                ${nsx_options}
            </select>
        </div>
        <div class="col-md-6">
            <label for="can_nang" class="form-label">Cân nặng</label>
            <input id="can_nang" class="form-control border-primary" type="text">
        </div>
    </div>

    <div class="row mb-3">
        <div class="col-md-6">
            <label class="form-label">Ẩn hiện</label>
            <div>
                <input name="an_hien" value="0" type="radio"> Ẩn
                <input name="an_hien" value="1" type="radio" checked> Hiện
            </div>
        </div>
        <div class="col-md-6">
            <label class="form-label">Nổi bật</label>
            <div>
                <input name="hot" value="0" type="radio"> Bình thường
                <input name="hot" value="1" type="radio" checked> Nổi bật
            </div>
        </div>
    </div>

    <button id="btn" type="button" class="btn btn-primary w-100">Thêm</button>
</form>
`;
};
const lay_nsx = async () => {
    return fetch(urlserver + "/nha_sx").then(res => res.json()).then(data => data);
};
export const them_sp = async () => {
    let ten = document.querySelector("#ten").value;
    let ngay = document.querySelector("#ngay").value;
    let gia = document.querySelector("#gia").value;
    let gia_km = document.querySelector("#gia_km").value;
    let hinh = document.querySelector("#hinh").value;
    let tinh_chat = document.querySelector("#tinh_chat").value;
    let xem = document.querySelector("#xem").value;
    let id_nha_sx = document.querySelector("#id_nha_sx").value;
    let can_nang = document.querySelector("#can_nang").value;
    let an_hien = document.querySelector("[name=an_hien]:checked").value;
    let hot = document.querySelector("[name=hot]:checked").value;
    let mau_sac = document.querySelector("#mau_sac").value;
    4;
    let data = {
        ten: ten,
        ngay: ngay,
        gia: gia,
        gia_km: gia_km,
        hinh: hinh,
        tinh_chat: tinh_chat,
        xem: xem,
        id_nha_sx: id_nha_sx,
        can_nang: can_nang,
        an_hien: an_hien,
        hot: hot,
        mau_sac: mau_sac
    };
    let opt = {
        method: 'post',
        body: JSON.stringify(data),
        Headers: { 'Content-type': 'application/json' }
    };
    let kq = await fetch(urlserver + `/san_pham/`, opt).then(res => res.json()).then(data => data);
    document.location = 'san_pham_list.html';
};
export const list_sp = async (sosp) => {
    let data = await fetch(urlserver + `/san_pham/?_sort=-ngay&_limit=${sosp}`).then(r => r.json()).then(d => d);
    let arr = data;
    let str = ``;
    arr.forEach(sp => str += motsp(sp));
    str = `
    <div id="listadminsp" class="container mt-4">
    <h2 class="d-flex justify-content-between align-items-center">
        Quản trị sản phẩm
        <a href="sp_them.html" class="btn btn-primary">Thêm</a>
    </h2>

    <div id="data" class="table-responsive">
        <table class="table table-bordered table-hover">
            <thead class="table-primary">
                <tr>
                    <th>Hình</th>
                    <th>ID, Tên, Ngày</th>
                    <th>Giá & Trạng thái</th>
                    <th>Thông tin</th>
                    <th>Thao tác</th>
                </tr>
            </thead>
            <tbody>
                ${str}
            </tbody>
        </table>
    </div>
</div>
`;
    return str;
};
let STT = 1;
const motsp = (sp) => {
    return `
    <div class="card product-card p-3 mb-3">
    <div class="row">
        
        <div class="col-md-3 text-center">
            <img src="${sp.hinh}" class="img-fluid rounded" alt="Hình sản phẩm">
        </div>

     
        <div class="col-md-6">
            <h5>ID: ${STT++} - Tên: ${sp.ten}</h5>
            <p><strong>Ngày:</strong> ${sp.ngay}</p>
            <p><strong>Giá gốc:</strong> ${Number(sp.gia).toLocaleString('vi')} VNĐ</p>
            <p><strong>Giá KM:</strong> ${Number(sp.gia_km).toLocaleString('vi')} VNĐ</p>
            <p><strong>Ẩn hiện:</strong> ${sp.an_hien == false ? 'Đang ẩn' : 'Đang hiện'}</p>
            <p><strong>Hot:</strong> ${sp.hot == false ? 'Bình thường' : 'Nổi bật'}</p>
        </div>

        
        <div class="col-md-3">
            <p><strong>Màu sắc:</strong> ${sp.mau_sac}</p>
            <p><strong>Cân nặng:</strong> ${sp.can_nang} </p>
            <p><strong>Lượt xem:</strong> ${sp.xem} lượt Xem</p>
            <p><strong>Tính chất:</strong> ${keycuaTinhChat(sp.tinh_chat)}</p>

            
            <div class="d-flex">
                <a href="san_pham_sua.html?id=${sp.id}" class="btn btn-warning me-2">Sửa</a>
                <button idsp="${sp.id}" class="btn btn-danger btnxoa" >Xóa</button>
            </div>
        </div>
    </div>
</div>

    `;
};
const keycuaTinhChat = (tc) => {
    const index = Object.values(TINH_CHAT).indexOf(tc);
    const key = Object.keys(TINH_CHAT)[index];
    return key;
};
export const xoa_sp = async (btn) => {
    let id = btn.getAttribute("idsp");
    let hoi = window.confirm('xoa that khong');
    if (hoi == false)
        return;
    let opt = { method: 'delete' };
    let kq = await fetch(urlserver + `/san_pham/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'san_pham_list.html';
};
export const form_sua_sp = async (id) => {
    let sp = await fetch(urlserver + `/san_pham/?id=${id}`).then(res => res.json()).then(data => data[0]);
    let nha_sx_arr = await lay_nsx();
    let nsx_options = ``;
    nha_sx_arr.forEach(nsx => nsx_options += `<option value='${nsx.id}' ${nsx.id == sp.id_nha_sx ? 'selected ' : ''}>${nsx.ten}</option>`);
    let mausac_options = ``;
    for (const key in MAU_SAC) {
        mausac_options += `<option value='${MAU_SAC[key]}' ${key == sp.mau_sac ? 'selected ' : ''}>${key}</option>`;
    }
    let tinhchat_options = ``;
    for (const key in TINH_CHAT) {
        tinhchat_options += `<option value='${TINH_CHAT[key]}'  ${key == sp.tinh_chat ? 'selected ' : ''}>${key} </option>`;
    }
    return `<form class="container border border-primary p-3 rounded">
      <div class="row mb-3">
          <div class="col-md-6">
              <label for="ten" class="form-label">Tên SP</label>
              <input id="ten" class="form-control border-primary" type="text" value='${sp.ten}'>
          </div>
          <div class="col-md-6">
              <label for="ngay" class="form-label">Ngày</label>
              <input id="ngay" class="form-control border-primary" type="date"value='${sp.ngay}'>
          </div>
      </div>
  
      <div class="row mb-3">
          <div class="col-md-6">
              <label for="gia" class="form-label">Giá gốc</label>
              <input id="gia" class="form-control border-primary" type="number"value='${sp.gia}'>
          </div>
          <div class="col-md-6">
              <label for="gia_km" class="form-label">Giá KM</label>
              <input id="gia_km" class="form-control border-primary" type="number"value='${sp.gia_km}'>
          </div>
      </div>
  
      <div class="row mb-3">
          <div class="col-md-6">
              <label for="hinh" class="form-label">Hình</label>
              <input id="hinh" class="form-control border-primary" type="text" value='${sp.hinh}'>
          </div>
          <div class="col-md-6">
              <label for="xem" class="form-label">Lượt xem</label>
              <input id="xem" class="form-control border-primary" type="number" value='${sp.xem}'>
          </div>
      </div>
  
      <div class="row mb-3">
          <div class="col-md-6">
              <label for="tinh_chat" class="form-label">Tính chất</label>
              <select id="tinh_chat" class="form-select border-primary" value='${sp.tinh_chat}'>
                  ${tinhchat_options}
              </select>
          </div>
          <div class="col-md-6">
              <label for="mau_sac" class="form-label">Màu sắc</label>
              <select id="mau_sac" class="form-select border-primary" value='${sp.mau_sac}'>
                  ${mausac_options}
              </select>
          </div>
      </div>
  
      <div class="row mb-3">
          <div class="col-md-6">
              <label for="id_nha_sx" class="form-label">Nhà sản xuất</label>
              <select id="id_nha_sx" class="form-select border-primary" >
                  ${nsx_options}
              </select>
          </div>
          <div class="col-md-6">
              <label for="can_nang" class="form-label">Cân nặng</label>
              <input id="can_nang" class="form-control border-primary" type="text" value='${sp.can_nang}'>
          </div>
      </div>
  
      <div class="row mb-3">
          <div class="col-md-6">
              <label class="form-label">Ẩn hiện</label>
              <div>
                  <input name="an_hien" value="0" type="radio" ${sp.an_hien == undefined || sp.an_hien == 0 ? 'checked' : ''}> Ẩn
                  <input name="an_hien" value="1" type="radio"${sp.an_hien == undefined || sp.an_hien == 1 ? 'checked' : ''}> Hiện
              </div>
          </div>
          <div class="col-md-6">
              <label class="form-label">Nổi bật</label>
              <div>
                  <input name="hot" value="0" type="radio"${sp.hot == undefined || sp.hot == 0 ? 'checked' : ''}> Bình thường
                  <input name="hot" value="1" type="radio"${sp.hot == undefined || sp.hot == 1 ? 'checked' : ''}> Nổi bật
              </div>
          </div>
      </div>
        <input type= 'hidden' id='id' value='${id}'>
      <button id="btn" type="button" class="btn btn-primary w-100">Update</button>
  </form>
  `;
};
export const sua_sp = async () => {
    let id = document.querySelector("#id").value;
    let ten = document.querySelector("#ten").value;
    let ngay = document.querySelector("#ngay").value;
    let gia = document.querySelector("#gia").value;
    let gia_km = document.querySelector("#gia_km").value;
    let hinh = document.querySelector("#hinh").value;
    let tinh_chat = document.querySelector("#tinh_chat").value;
    let xem = document.querySelector("#xem").value;
    let id_nha_sx = document.querySelector("#id_nha_sx").value;
    let can_nang = document.querySelector("#can_nang").value;
    let an_hien = document.querySelector("[name=an_hien]:checked").value;
    let hot = document.querySelector("[name=hot]:checked").value;
    let mau_sac = document.querySelector("#mau_sac").value;
    4;
    let data = {
        ten: ten,
        ngay: ngay,
        gia: gia,
        gia_km: gia_km,
        hinh: hinh,
        tinh_chat: tinh_chat,
        xem: xem,
        id_nha_sx: id_nha_sx,
        can_nang: can_nang,
        an_hien: an_hien,
        hot: hot,
        mau_sac: mau_sac
    };
    let opt = {
        method: 'put',
        body: JSON.stringify(data),
        Headers: { 'Content-type': 'application/json' }
    };
    let kq = await fetch(urlserver + `/san_pham/${id}`, opt).then(res => res.json()).then(data => data);
    document.location = 'san_pham_list.html';
};
