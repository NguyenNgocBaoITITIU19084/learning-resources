const express = require("express");

const { set, exists, get, incrBy } = require("./redis.service");

const app = express();
const PORT = 3000;

app.get("/", async (req, res) => {
  const time = new Date().getTime();
  console.log(`time::${time}`);

  // so luong ton kho
  const slTonKho = 100;

  // ten san pham
  const keyName = "iphone 13";

  // gia su moi lan mua thi luong tieu thu hang ton kho la 1
  const slMua = 1;

  // so luong ban ra neu chua ton tai thi set = 0, neu da ban ra thanh cong thi + 1
  const exist = await exists(keyName);
  if (!exist) await set(keyName, 0);

  // so luong hang da ban ra
  let slBanRa = await get(keyName);
  console.log(
    "truoc khi user order thanh cong thi so luong ban ra la:::",
    slBanRa
  );

  //slBanRa + slMua > slTonKho thi tra ve het hang
  if (+slBanRa + slMua > slTonKho) {
    console.log("Het Hang");
    return;
  }
  if (slBanRa > slTonKho) {
    await set("banquaroi", slBanRa - slTonKho);
  }
  slBanRa = await incrBy(keyName, slMua);
  console.log("so luong da ban ra:::", slBanRa);

  return res.json({ message: "OK", time });
});

app.listen(PORT, () => {
  console.log(`the sever running on port ${PORT}`);
});
