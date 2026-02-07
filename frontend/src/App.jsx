import React, { useEffect, useMemo, useState } from "react";
import { api } from "./api";

const categories = ["特色菜", "鱼类", "虾类", "墨斗", "虾姑肉", "鸡肉", "猪肉", "豆腐", "蛋类", "菜/汤", "饭/水"];
const categoryLabels = {
  zh: categories,
  en: [
    "Signature",
    "Fish",
    "Shrimp",
    "Squid",
    "Mantis Shrimp",
    "Chicken",
    "Pork",
    "Tofu",
    "Eggs",
    "Vegetables/Soup",
    "Rice/Water"
  ],
  ms: [
    "Hidangan Istimewa",
    "Ikan",
    "Udang",
    "Sotong",
    "Udang Lipan",
    "Ayam",
    "Khinzir",
    "Tauhu",
    "Telur",
    "Sayur/Sup",
    "Nasi/Air"
  ]
};

const uiText = {
  zh: {
    appName: "新发发",
    adminName: "新发发 · 后台",
    adminEntry: "管理入口",
    backToCustomer: "返回点餐",
    tableTitle: "请输入桌号",
    tablePlaceholder: "仅数字",
    enterMenu: "进入菜单",
    cart: "购物车",
    emptyCart: "暂无菜品",
    total: "总价",
    submitOrder: "提交订单",
    orderSuccess: "订单已提交",
    orderSuccessTip: "请线下付款，后厨将尽快出餐。",
    continueOrder: "继续点餐",
    adminLogin: "管理员登录",
    adminPasswordPlaceholder: "请输入管理密码",
    login: "登录",
    tabOrders: "订单管理",
    tabDishes: "菜单管理",
    tabClean: "数据清理",
    statusPending: "未出餐",
    statusHistory: "历史订单",
    tableNo: "桌号",
    orderTime: "下单时间",
    orderItems: "菜品",
    orderTotal: "总价",
    action: "操作",
    markFinished: "已出餐",
    finished: "已完成",
    addDish: "新增菜品",
    editDish: "修改菜品",
    nameZh: "名称（中文）",
    nameEn: "名称（English）",
    nameMs: "名称（Bahasa Melayu）",
    price: "价格",
    priceStandard: "标准价格",
    priceSmall: "小份价格",
    priceMedium: "中份价格",
    priceLarge: "大份价格",
    drinkTemp: "饮料温度",
    drinkTempNone: "不适用",
    drinkTempCold: "冷",
    drinkTempHot: "热",
    drinkTempBoth: "冷/热",
    imageUrl: "图片URL",
    remarkZh: "备注（中文）",
    remarkEn: "备注（English）",
    remarkMs: "备注（Bahasa Melayu）",
    save: "保存",
    cancel: "取消",
    currentMenu: "当前菜单",
    edit: "编辑",
    delete: "删除",
    clearOrdersTitle: "清空订单数据",
    clearOrdersTip: "不会影响菜单数据，请谨慎操作。",
    clearOrders: "一键清空订单",
    addToCart: "加入购物车",
    tableHint: "当前桌号",
    changeTable: "更换桌号",
    sizeSmall: "小份",
    sizeMedium: "中份",
    sizeLarge: "大份",
    sizeStandard: "标准",
    cartRemark: "备注",
    cartRemarkPlaceholder: "口味/忌口等备注",
    paid: "已付款",
    notPaid: "未付款",
    revenueTitle: "当日收款统计",
    revenueDate: "日期",
    revenueAmount: "收款总额",
    hideDish: "隐藏",
    showDish: "显示",
    useStandard: "使用标准价",
    useSizes: "选择大小份",
    counterNotice: "柜台计价菜品：",
    counterNoticeTip: "以上菜品以柜台实际价格为准"
  },
  en: {
    appName: "Xinfafa",
    adminName: "Xinfafa · Admin",
    adminEntry: "Admin",
    backToCustomer: "Back",
    tableTitle: "Enter Table Number",
    tablePlaceholder: "Digits only",
    enterMenu: "Enter Menu",
    cart: "Cart",
    emptyCart: "No items",
    total: "Total",
    submitOrder: "Submit Order",
    orderSuccess: "Order Submitted",
    orderSuccessTip: "Please pay offline. The kitchen will prepare soon.",
    continueOrder: "Order More",
    adminLogin: "Admin Login",
    adminPasswordPlaceholder: "Enter admin password",
    login: "Login",
    tabOrders: "Orders",
    tabDishes: "Menu",
    tabClean: "Data Cleanup",
    statusPending: "Pending",
    statusHistory: "History",
    tableNo: "Table",
    orderTime: "Time",
    orderItems: "Items",
    orderTotal: "Total",
    action: "Action",
    markFinished: "Done",
    finished: "Finished",
    addDish: "Add Dish",
    editDish: "Edit Dish",
    nameZh: "Name (Chinese)",
    nameEn: "Name (English)",
    nameMs: "Name (Bahasa Melayu)",
    price: "Price",
    priceStandard: "Standard Price",
    priceSmall: "Small Price",
    priceMedium: "Medium Price",
    priceLarge: "Large Price",
    drinkTemp: "Drink Temperature",
    drinkTempNone: "Not applicable",
    drinkTempCold: "Cold",
    drinkTempHot: "Hot",
    drinkTempBoth: "Cold/Hot",
    imageUrl: "Image URL",
    remarkZh: "Remark (Chinese)",
    remarkEn: "Remark (English)",
    remarkMs: "Remark (Bahasa Melayu)",
    save: "Save",
    cancel: "Cancel",
    currentMenu: "Current Menu",
    edit: "Edit",
    delete: "Delete",
    clearOrdersTitle: "Clear Orders",
    clearOrdersTip: "Menu data will remain. Proceed carefully.",
    clearOrders: "Clear All Orders",
    addToCart: "Add to Cart",
    tableHint: "Table",
    changeTable: "Change Table",
    sizeSmall: "Small",
    sizeMedium: "Medium",
    sizeLarge: "Large",
    sizeStandard: "Standard",
    cartRemark: "Remark",
    cartRemarkPlaceholder: "Taste notes or dietary needs",
    paid: "Paid",
    notPaid: "Unpaid",
    revenueTitle: "Daily Revenue",
    revenueDate: "Date",
    revenueAmount: "Total Revenue",
    hideDish: "Hide",
    showDish: "Show",
    useStandard: "Use Standard",
    useSizes: "Choose Sizes",
    counterNotice: "Counter-priced items:",
    counterNoticeTip: "Final price will be confirmed at the counter"
  },
  ms: {
    appName: "Xinfafa",
    adminName: "Xinfafa · Admin",
    adminEntry: "Admin",
    backToCustomer: "Kembali",
    tableTitle: "Masukkan Nombor Meja",
    tablePlaceholder: "Nombor sahaja",
    enterMenu: "Masuk Menu",
    cart: "Troli",
    emptyCart: "Tiada item",
    total: "Jumlah",
    submitOrder: "Hantar Pesanan",
    orderSuccess: "Pesanan Dihantar",
    orderSuccessTip: "Sila bayar secara tunai. Dapur akan sediakan segera.",
    continueOrder: "Tambah Pesanan",
    adminLogin: "Log Masuk Admin",
    adminPasswordPlaceholder: "Masukkan kata laluan admin",
    login: "Log Masuk",
    tabOrders: "Pesanan",
    tabDishes: "Menu",
    tabClean: "Pembersihan Data",
    statusPending: "Belum siap",
    statusHistory: "Sejarah",
    tableNo: "Meja",
    orderTime: "Masa",
    orderItems: "Item",
    orderTotal: "Jumlah",
    action: "Tindakan",
    markFinished: "Siap",
    finished: "Selesai",
    addDish: "Tambah Menu",
    editDish: "Sunting Menu",
    nameZh: "Nama (Cina)",
    nameEn: "Nama (English)",
    nameMs: "Nama (Bahasa Melayu)",
    price: "Harga",
    priceStandard: "Harga Standard",
    priceSmall: "Harga Kecil",
    priceMedium: "Harga Sederhana",
    priceLarge: "Harga Besar",
    drinkTemp: "Suhu Minuman",
    drinkTempNone: "Tidak berkenaan",
    drinkTempCold: "Sejuk",
    drinkTempHot: "Panas",
    drinkTempBoth: "Sejuk/Panas",
    imageUrl: "URL Gambar",
    remarkZh: "Catatan (Cina)",
    remarkEn: "Catatan (English)",
    remarkMs: "Catatan (Bahasa Melayu)",
    save: "Simpan",
    cancel: "Batal",
    currentMenu: "Menu Semasa",
    edit: "Sunting",
    delete: "Padam",
    clearOrdersTitle: "Padam Pesanan",
    clearOrdersTip: "Data menu kekal. Sila berhati-hati.",
    clearOrders: "Padam Semua Pesanan",
    addToCart: "Tambah ke Troli",
    tableHint: "Meja",
    changeTable: "Tukar Meja",
    sizeSmall: "Kecil",
    sizeMedium: "Sederhana",
    sizeLarge: "Besar",
    sizeStandard: "Standard",
    cartRemark: "Catatan",
    cartRemarkPlaceholder: "Rasa/keperluan diet",
    paid: "Dibayar",
    notPaid: "Belum bayar",
    revenueTitle: "Jumlah Kutipan Harian",
    revenueDate: "Tarikh",
    revenueAmount: "Jumlah Kutipan",
    hideDish: "Sembunyi",
    showDish: "Papar",
    useStandard: "Guna Standard",
    useSizes: "Pilih Saiz",
    counterNotice: "Item harga kaunter:",
    counterNoticeTip: "Harga akhir ditentukan di kaunter"
  }
};

function formatPrice(value) {
  return Number(value || 0).toFixed(2);
}

function toNumber(value) {
  const num = Number(value);
  return Number.isFinite(num) ? num : null;
}

function useCart() {
  const [cart, setCart] = useState([]);
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );
  const count = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity, 0),
    [cart]
  );

  const addItem = (dish, size, price, temp, priceText) => {
    setCart((prev) => {
      const found = prev.find(
        (item) => item._id === dish._id && item.size === size && item.temp === temp
      );
      if (found) {
        return prev.map((item) =>
          item._id === dish._id && item.size === size && item.temp === temp
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...dish, size, price, priceText, temp, quantity: 1 }];
    });
  };

  const updateQuantity = (id, size, temp, quantity) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item._id === id && item.size === size && item.temp === temp
            ? { ...item, quantity }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const clear = () => setCart([]);

  return { cart, total, count, addItem, updateQuantity, clear };
}

export default function App() {
  const [mode, setMode] = useState("customer");
  const [language, setLanguage] = useState(() => {
    if (typeof window === "undefined") return "zh";
    return window.localStorage.getItem("language") || "zh";
  });
  const [tableNo, setTableNo] = useState("");
  const [step, setStep] = useState("table");
  const [dishes, setDishes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [cartVisible, setCartVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [adminAuthed, setAdminAuthed] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [adminTab, setAdminTab] = useState("orders");
  const [orders, setOrders] = useState([]);
  const [orderStatus, setOrderStatus] = useState(0);
  const [dishForm, setDishForm] = useState({
    name: "",
    nameEn: "",
    nameMs: "",
    category: categories[0],
    price: "",
    priceStandard: "",
    priceSmall: "",
    priceMedium: "",
    priceLarge: "",
    drinkTemp: "none",
    imageUrl: "",
    remark: "",
    remarkEn: "",
    remarkMs: ""
  });
  const [editingDishId, setEditingDishId] = useState(null);
  const [sizeSelections, setSizeSelections] = useState({});
  const [tempSelections, setTempSelections] = useState({});
  const [cartRemark, setCartRemark] = useState("");
  const [lastOrder, setLastOrder] = useState(null);
  const [revenueDate, setRevenueDate] = useState("");
  const [revenueTotal, setRevenueTotal] = useState(0);

  const { cart, total, count, addItem, updateQuantity, clear } = useCart();

  const filteredDishes = useMemo(
    () => dishes.filter((dish) => dish.category === selectedCategory),
    [dishes, selectedCategory]
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("language", language);
    }
  }, [language]);

  const getStandardOption = (dish) => {
    const standardNumeric =
      typeof dish.priceStandard === "number"
        ? dish.priceStandard
        : toNumber(dish.priceStandard);
    const standardPrice =
      typeof standardNumeric === "number"
        ? standardNumeric
        : typeof dish.price === "number"
        ? dish.price
        : null;
    const standardText =
      typeof dish.priceStandard === "string" && toNumber(dish.priceStandard) === null
        ? dish.priceStandard.trim()
        : "";
    if (standardText) {
      return { label: "standard", value: "standard", price: 0, priceText: standardText };
    }
    if (typeof standardPrice === "number" && standardPrice > 0) {
      return { label: "standard", value: "standard", price: standardPrice };
    }
    return null;
  };

  const getSizeOptions = (dish) => {
    const options = [];
    if (typeof dish.priceSmall === "number" && dish.priceSmall > 0) {
      options.push({ label: "small", value: "small", price: dish.priceSmall });
    }
    const mediumPrice =
      typeof dish.priceMedium === "number"
        ? dish.priceMedium
        : typeof dish.price === "number"
        ? dish.price
        : null;
    if (typeof mediumPrice === "number" && mediumPrice > 0) {
      options.push({ label: "medium", value: "medium", price: mediumPrice });
    }
    if (typeof dish.priceLarge === "number" && dish.priceLarge > 0) {
      options.push({ label: "large", value: "large", price: dish.priceLarge });
    }
    return options;
  };

  const getSelectedSize = (dish, standardOption, sizeOptions) => {
    const selected = sizeSelections[dish._id];
    if (selected === "standard" && standardOption) return "standard";
    if (sizeOptions.some((option) => option.value === selected)) return selected;
    if (standardOption) return "standard";
    if (sizeOptions.length > 0) return sizeOptions[0].value;
    return "standard";
  };

  const getDisplayOptions = (dish) => {
    const standardOption = getStandardOption(dish);
    const sizeOptions = getSizeOptions(dish);
    const selected = getSelectedSize(dish, standardOption, sizeOptions);
    if (selected === "standard" && standardOption) return [standardOption];
    if (selected !== "standard" && sizeOptions.length > 0) return sizeOptions;
    return standardOption ? [standardOption] : sizeOptions;
  };

  const getDrinkTempOptions = (dish) => {
    if (dish.drinkTemp === "both") return ["cold", "hot"];
    if (dish.drinkTemp === "cold") return ["cold"];
    if (dish.drinkTemp === "hot") return ["hot"];
    return [];
  };

  const getSelectedTemp = (dish) => {
    const options = getDrinkTempOptions(dish);
    if (options.length === 0) return "";
    return tempSelections[dish._id] || options[0];
  };

  const getDishName = (dish) => {
    if (language === "en") return dish.nameEn || dish.name;
    if (language === "ms") return dish.nameMs || dish.name;
    return dish.name;
  };

  const getDishRemark = (dish) => {
    if (language === "en") return dish.remarkEn || dish.remark;
    if (language === "ms") return dish.remarkMs || dish.remark;
    return dish.remark;
  };

  const t = uiText[language] || uiText.zh;
  const localizedCategories = categoryLabels[language] || categoryLabels.zh;
  const categoryLabelMap = useMemo(
    () =>
      categories.reduce((acc, key, index) => {
        acc[key] = localizedCategories[index] || key;
        return acc;
      }, {}),
    [localizedCategories]
  );

  const getItemName = (item) => {
    if (language === "en") return item.nameEn || item.name;
    if (language === "ms") return item.nameMs || item.name;
    return item.name;
  };

  const getSizeLabel = (value) => {
    if (value === "standard") return t.sizeStandard;
    if (value === "small") return t.sizeSmall;
    if (value === "large") return t.sizeLarge;
    return t.sizeMedium;
  };

  const getTempLabel = (value) => {
    if (value === "cold") return t.drinkTempCold;
    if (value === "hot") return t.drinkTempHot;
    return "";
  };

  const standardValue = String(dishForm.priceStandard || "").trim();
  const standardNumeric = toNumber(standardValue);
  const standardActive = standardValue !== "" && standardNumeric !== 0;
  const sizeActive = [dishForm.priceSmall, dishForm.priceMedium, dishForm.priceLarge]
    .map(toNumber)
    .some((value) => typeof value === "number" && value > 0);
  const disableStandard = sizeActive;
  const disableSizes = standardActive;

  useEffect(() => {
    if (mode === "customer" && step === "menu") {
      api.getDishes(false).then((res) => setDishes(res.data)).catch(handleError);
    }
  }, [mode, step]);

  useEffect(() => {
    if (mode === "admin" && adminAuthed) {
      loadOrders(orderStatus);
      loadDishes(true);
    }
  }, [mode, adminAuthed, orderStatus]);

  useEffect(() => {
    if (mode === "admin" && adminAuthed && adminTab === "orders" && revenueDate) {
      handleLoadRevenue(revenueDate);
    }
  }, [mode, adminAuthed, adminTab, revenueDate]);

  const handleError = (err) => {
    setMessage(err.message || "操作失败");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleEnterMenu = () => {
    if (!/^\d+$/.test(tableNo)) {
      return handleError(new Error("桌号必须是数字"));
    }
    setStep("menu");
  };

  const submitOrder = async () => {
    try {
      if (cart.length === 0) return handleError(new Error("购物车为空"));
      await api.createOrder({
        tableNo,
        items: cart.map((item) => ({
          dishId: item._id,
          name: item.name,
          nameEn: item.nameEn || "",
          nameMs: item.nameMs || "",
          price: item.price,
          priceText: item.priceText || "",
          quantity: item.quantity,
          size: item.size,
          temp: item.temp || ""
        })),
        remark: cartRemark
      });
      setLastOrder({
        tableNo,
        items: cart,
        total,
        remark: cartRemark
      });
      clear();
      setCartRemark("");
      setMessage("下单成功，请线下付款");
      setStep("success");
    } catch (err) {
      handleError(err);
    }
  };

  const loadOrders = async (status) => {
    try {
      const res = await api.getOrders(status);
      setOrders(res.data);
    } catch (err) {
      handleError(err);
    }
  };

  const loadDishes = async (all = false) => {
    try {
      const res = await api.getDishes(all);
      setDishes(res.data);
    } catch (err) {
      handleError(err);
    }
  };

  const handleFinishOrder = async (orderId) => {
    try {
      await api.finishOrder(orderId);
      loadOrders(orderStatus);
    } catch (err) {
      handleError(err);
    }
  };

  const handlePayOrder = async (orderId) => {
    try {
      await api.payOrder(orderId);
      loadOrders(orderStatus);
      if (revenueDate) {
        handleLoadRevenue(revenueDate);
      }
    } catch (err) {
      handleError(err);
    }
  };

  const handleLoadRevenue = async (date) => {
    try {
      const res = await api.getRevenueSummary(date);
      setRevenueTotal(res.data.total || 0);
    } catch (err) {
      handleError(err);
    }
  };

  const handleAdminLogin = async () => {
    try {
      await api.adminLogin(adminPassword);
      setAdminAuthed(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleDishSubmit = async (event) => {
    event.preventDefault();
    const standardNumericValue = toNumber(dishForm.priceStandard);
    const mediumNumericValue = toNumber(dishForm.priceMedium);
    const smallNumericValue = toNumber(dishForm.priceSmall);
    const largeNumericValue = toNumber(dishForm.priceLarge);
    const priceBase =
      standardNumericValue ??
      mediumNumericValue ??
      smallNumericValue ??
      largeNumericValue ??
      0;
    const payload = {
      ...dishForm,
      price: priceBase,
      priceStandard: dishForm.priceStandard === "" ? undefined : dishForm.priceStandard,
      priceSmall: dishForm.priceSmall === "" ? undefined : Number(dishForm.priceSmall),
      priceMedium: dishForm.priceMedium === "" ? undefined : Number(dishForm.priceMedium),
      priceLarge: dishForm.priceLarge === "" ? undefined : Number(dishForm.priceLarge)
    };
    try {
      if (editingDishId) {
        await api.updateDish({ id: editingDishId, ...payload });
      } else {
        await api.addDish(payload);
      }
      setDishForm({
        name: "",
        nameEn: "",
        nameMs: "",
        category: categories[0],
        price: "",
        priceStandard: "",
        priceSmall: "",
        priceMedium: "",
        priceLarge: "",
        drinkTemp: "none",
        imageUrl: "",
        remark: "",
        remarkEn: "",
        remarkMs: ""
      });
      setEditingDishId(null);
      loadDishes();
    } catch (err) {
      handleError(err);
    }
  };

  const handleEditDish = (dish) => {
    setEditingDishId(dish._id);
    setDishForm({
      name: dish.name,
      nameEn: dish.nameEn || "",
      nameMs: dish.nameMs || "",
      category: dish.category,
      price: dish.price,
      priceStandard: dish.priceStandard ?? dish.price ?? "",
      priceSmall: dish.priceSmall ?? "",
      priceMedium: dish.priceMedium ?? dish.price ?? "",
      priceLarge: dish.priceLarge ?? "",
      drinkTemp: dish.drinkTemp || "none",
      imageUrl: dish.imageUrl || "",
      remark: dish.remark || "",
      remarkEn: dish.remarkEn || "",
      remarkMs: dish.remarkMs || ""
    });
    setAdminTab("dishes");
  };

  const handleDeleteDish = async (id) => {
    try {
      await api.deleteDish(id);
      loadDishes(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleToggleDishStatus = async (dish) => {
    try {
      await api.updateDish({ id: dish._id, status: dish.status === 1 ? 0 : 1 });
      loadDishes(true);
    } catch (err) {
      handleError(err);
    }
  };

  const handleClearOrders = async () => {
    if (!window.confirm("确认清空所有订单？此操作不可撤销")) return;
    try {
      await api.clearOrders(adminPassword);
      loadOrders(orderStatus);
    } catch (err) {
      handleError(err);
    }
  };

  if (mode === "admin") {
    return (
      <div className="app">
        <div className="header">
          <div className="logo">{t.adminName}</div>
          <div className="flex">
            <button className={`button ${language === "zh" ? "" : "ghost"}`} onClick={() => setLanguage("zh")}>中文</button>
            <button className={`button ${language === "en" ? "" : "ghost"}`} onClick={() => setLanguage("en")}>English</button>
            <button className={`button ${language === "ms" ? "" : "ghost"}`} onClick={() => setLanguage("ms")}>马来文</button>
            <button className="button ghost" onClick={() => setMode("customer")}>{t.backToCustomer}</button>
          </div>
        </div>

        {message && <div className="card section">{message}</div>}

        {!adminAuthed ? (
          <div className="card">
            <h3>{t.adminLogin}</h3>
            <input
              className="input"
              type="password"
              placeholder={t.adminPasswordPlaceholder}
              value={adminPassword}
              onChange={(event) => setAdminPassword(event.target.value)}
            />
            <div className="section">
              <button className="button" onClick={handleAdminLogin}>{t.login}</button>
            </div>
          </div>
        ) : (
          <div className="section">
            <div className="flex">
              <button className={`button ${adminTab === "orders" ? "" : "ghost"}`} onClick={() => setAdminTab("orders")}>{t.tabOrders}</button>
              <button className={`button ${adminTab === "dishes" ? "" : "ghost"}`} onClick={() => setAdminTab("dishes")}>{t.tabDishes}</button>
              <button className={`button ${adminTab === "clean" ? "" : "ghost"}`} onClick={() => setAdminTab("clean")}>{t.tabClean}</button>
            </div>

            {adminTab === "orders" && (
              <div className="section card">
                <div className="space-between">
                  <h3>{t.tabOrders}</h3>
                  <div className="flex">
                    <button className={`button ${orderStatus === 0 ? "" : "ghost"}`} onClick={() => setOrderStatus(0)}>{t.statusPending}</button>
                    <button className={`button ${orderStatus === 1 ? "" : "ghost"}`} onClick={() => setOrderStatus(1)}>{t.statusHistory}</button>
                  </div>
                </div>
                {orderStatus === 1 && (
                  <div className="section space-between">
                    <div className="flex">
                      <label className="small">{t.revenueDate}</label>
                      <input
                        className="input input-inline"
                        type="date"
                        value={revenueDate}
                        onChange={(event) => setRevenueDate(event.target.value)}
                      />
                    </div>
                    <div className="small">
                      {t.revenueAmount}：￥{formatPrice(revenueTotal)}
                    </div>
                  </div>
                )}
                <table className="table">
                  <thead>
                    <tr>
                      <th>{t.tableNo}</th>
                      <th>{t.orderTime}</th>
                      <th>{t.orderItems}</th>
                      <th>{t.orderTotal}</th>
                      <th>{t.action}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order._id}>
                        <td>{order.tableNo}</td>
                        <td>{new Date(order.createdAt).toLocaleString()}</td>
                        <td>
                          {order.items.map((item) => (
                            <div key={`${item.dishId}-${item.size || "medium"}-${item.temp || "none"}`} className="small">
                              {getItemName(item)}
                              {item.size ? `（${getSizeLabel(item.size)}）` : ""}
                              {item.temp ? `/${getTempLabel(item.temp)}` : ""}
                              {` x ${item.quantity}（${item.priceText ? item.priceText : `￥${formatPrice(item.price)}`}）`}
                            </div>
                          ))}
                          {order.remark && (
                            <div className="small">{t.cartRemark}：{order.remark}</div>
                          )}
                        </td>
                        <td>￥{formatPrice(order.totalPrice)}</td>
                        <td>
                          {orderStatus === 0 ? (
                            <button className="button" onClick={() => handleFinishOrder(order._id)}>{t.markFinished}</button>
                          ) : (
                            <div className="flex">
                              {order.paid ? (
                                <span className="tag">{t.paid}</span>
                              ) : (
                                <button className="button" onClick={() => handlePayOrder(order._id)}>{t.paid}</button>
                              )}
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {adminTab === "dishes" && (
              <div className="section">
                <div className="grid">
                  <div className="card">
                    <h3>{editingDishId ? t.editDish : t.addDish}</h3>
                    <form onSubmit={handleDishSubmit} className="section">
                      <input className="input" placeholder={t.nameZh} value={dishForm.name} onChange={(event) => setDishForm({ ...dishForm, name: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder={t.nameEn} value={dishForm.nameEn} onChange={(event) => setDishForm({ ...dishForm, nameEn: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.nameMs} value={dishForm.nameMs} onChange={(event) => setDishForm({ ...dishForm, nameMs: event.target.value })} />
                      </div>
                      <div className="section">
                        <select className="input" value={dishForm.category} onChange={(event) => setDishForm({ ...dishForm, category: event.target.value })}>
                          {categories.map((cat) => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <input
                        className="input"
                        placeholder={t.priceStandard}
                        value={dishForm.priceStandard}
                        onChange={(event) => setDishForm({ ...dishForm, priceStandard: event.target.value })}
                        disabled={disableStandard}
                      />
                      <div className="section">
                        <input
                          className="input"
                          placeholder={t.priceMedium}
                          value={dishForm.priceMedium}
                          onChange={(event) => setDishForm({ ...dishForm, priceMedium: event.target.value })}
                          disabled={disableSizes}
                        />
                      </div>
                      <div className="section">
                        <input
                          className="input"
                          placeholder={t.priceSmall}
                          value={dishForm.priceSmall}
                          onChange={(event) => setDishForm({ ...dishForm, priceSmall: event.target.value })}
                          disabled={disableSizes}
                        />
                      </div>
                      <div className="section">
                        <input
                          className="input"
                          placeholder={t.priceLarge}
                          value={dishForm.priceLarge}
                          onChange={(event) => setDishForm({ ...dishForm, priceLarge: event.target.value })}
                          disabled={disableSizes}
                        />
                      </div>
                      <div className="section">
                        <select className="input" value={dishForm.drinkTemp} onChange={(event) => setDishForm({ ...dishForm, drinkTemp: event.target.value })}>
                          <option value="none">{t.drinkTempNone}</option>
                          <option value="cold">{t.drinkTempCold}</option>
                          <option value="hot">{t.drinkTempHot}</option>
                          <option value="both">{t.drinkTempBoth}</option>
                        </select>
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.imageUrl} value={dishForm.imageUrl} onChange={(event) => setDishForm({ ...dishForm, imageUrl: event.target.value })} />
                      </div>
                      <input className="input" placeholder={t.remarkZh} value={dishForm.remark} onChange={(event) => setDishForm({ ...dishForm, remark: event.target.value })} />
                      <div className="section">
                        <input className="input" placeholder={t.remarkEn} value={dishForm.remarkEn} onChange={(event) => setDishForm({ ...dishForm, remarkEn: event.target.value })} />
                      </div>
                      <div className="section">
                        <input className="input" placeholder={t.remarkMs} value={dishForm.remarkMs} onChange={(event) => setDishForm({ ...dishForm, remarkMs: event.target.value })} />
                      </div>
                      <div className="section flex">
                        <button className="button" type="submit">{t.save}</button>
                        {editingDishId && (
                          <button className="button ghost" type="button" onClick={() => {
                            setEditingDishId(null);
                            setDishForm({
                              name: "",
                              nameEn: "",
                              nameMs: "",
                              category: categories[0],
                              price: "",
                              priceStandard: "",
                              priceSmall: "",
                              priceMedium: "",
                              priceLarge: "",
                              drinkTemp: "none",
                              imageUrl: "",
                              remark: "",
                              remarkEn: "",
                              remarkMs: ""
                            });
                          }}>{t.cancel}</button>
                        )}
                      </div>
                    </form>
                  </div>

                  <div className="card">
                    <h3>{t.currentMenu}</h3>
                    {dishes.map((dish) => (
                      <div key={dish._id} className="section space-between">
                        <div>
                          <div className="flex">
                            <span>{getDishName(dish)}</span>
                            {dish.status === 0 && <span className="tag">{t.hideDish}</span>}
                          </div>
                          <div className="small">
                            {categoryLabelMap[dish.category]} · {getDisplayOptions(dish)
                              .map((option) => `${getSizeLabel(option.value)} ￥${formatPrice(option.price)}`)
                              .join(" / ")}
                          </div>
                        </div>
                        <div className="flex">
                          <button className="button ghost" onClick={() => handleToggleDishStatus(dish)}>
                            {dish.status === 1 ? t.hideDish : t.showDish}
                          </button>
                          <button className="button ghost" onClick={() => handleEditDish(dish)}>{t.edit}</button>
                          <button className="button danger" onClick={() => handleDeleteDish(dish._id)}>{t.delete}</button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {adminTab === "clean" && (
              <div className="card section">
                <h3>{t.clearOrdersTitle}</h3>
                <p className="small">{t.clearOrdersTip}</p>
                <button className="button danger" onClick={handleClearOrders}>{t.clearOrders}</button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="app">
      <div className="header">
        <div className="logo">{t.appName}</div>
        <div className="flex">
          <button className={`button ${language === "zh" ? "" : "ghost"}`} onClick={() => setLanguage("zh")}>中文</button>
          <button className={`button ${language === "en" ? "" : "ghost"}`} onClick={() => setLanguage("en")}>English</button>
          <button className={`button ${language === "ms" ? "" : "ghost"}`} onClick={() => setLanguage("ms")}>马来文</button>
          <div className="admin-entry" onClick={() => setMode("admin")}>{t.adminEntry}</div>
        </div>
      </div>

      {message && <div className="card section">{message}</div>}

      {step === "table" && (
        <div className="card">
          <h3>{t.tableTitle}</h3>
          <input
            className="input"
            placeholder={t.tablePlaceholder}
            value={tableNo}
            onChange={(event) => setTableNo(event.target.value)}
          />
          <div className="section">
            <button className="button" onClick={handleEnterMenu}>{t.enterMenu}</button>
          </div>
        </div>
      )}

      {step === "menu" && (
        <div>
          <div className="card section space-between">
            <div>
              <strong>{t.tableHint}：</strong>{tableNo}
            </div>
            <button className="button ghost" onClick={() => setStep("table")}>
              {t.changeTable}
            </button>
          </div>
          <div className="cart-button" onClick={() => setCartVisible(!cartVisible)}>
            {t.cart} {count}
          </div>

          {cartVisible && (
            <div className="card cart-panel">
              <h4>{t.cart}</h4>
              {cart.length === 0 && <div className="small">{t.emptyCart}</div>}
              {cart.map((item) => (
                <div key={`${item._id}-${item.size}-${item.temp || "none"}`} className="section space-between">
                  <div>
                    <div>{getItemName(item)}</div>
                    <div className="small">
                      {item.size ? `${getSizeLabel(item.size)} · ` : ""}
                      {item.temp ? `${getTempLabel(item.temp)} · ` : ""}
                      {item.priceText ? item.priceText : `￥${formatPrice(item.price)}`}
                    </div>
                  </div>
                  <div className="flex">
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.size, item.temp, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button className="button ghost" onClick={() => updateQuantity(item._id, item.size, item.temp, item.quantity + 1)}>+</button>
                  </div>
                </div>
              ))}
              <div className="section">
                <label className="small">{t.cartRemark}</label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder={t.cartRemarkPlaceholder}
                  value={cartRemark}
                  onChange={(event) => setCartRemark(event.target.value)}
                />
              </div>
              <div className="section space-between">
                <strong>{t.total}</strong>
                <strong>￥{formatPrice(total)}</strong>
              </div>
              {cart.some((item) => item.priceText) && (
                <div className="small">
                  {t.counterNotice}
                  {cart
                    .filter((item) => item.priceText)
                    .map((item) => getItemName(item))
                    .join("、")}
                  。{t.counterNoticeTip}
                </div>
              )}
              <button className="button" onClick={submitOrder}>{t.submitOrder}</button>
            </div>
          )}

          <div className="menu-layout">
            <div className="card category-list">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={`button category-button ${selectedCategory === cat ? "" : "ghost"}`}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {categoryLabelMap[cat]}
                </button>
              ))}
            </div>

            <div className="grid">
              {filteredDishes.map((dish) => (
                <div key={dish._id} className="card">
                  <div className="space-between">
                    <div>
                      <h4>{getDishName(dish)}</h4>
                      <div className="small">
                        {getDisplayOptions(dish)
                          .map((option) =>
                            option.priceText
                              ? `${getSizeLabel(option.value)} ${option.priceText}`
                              : `${getSizeLabel(option.value)} ￥${formatPrice(option.price)}`
                          )
                          .join(" / ")}
                      </div>
                    </div>
                    <span className="badge">{categoryLabelMap[dish.category]}</span>
                  </div>
                  {dish.imageUrl && (
                    <img src={dish.imageUrl} alt={dish.name} className="dish-image" />
                  )}
                  {getDishRemark(dish) && <div className="small section">{getDishRemark(dish)}</div>}
                  <div className="section">
                    {(() => {
                      const standardOption = getStandardOption(dish);
                      const sizeOptions = getSizeOptions(dish);
                      const selected = getSelectedSize(dish, standardOption, sizeOptions);
                      const showStandard = Boolean(standardOption) && selected === "standard";
                      const showSizes = sizeOptions.length > 0 && selected !== "standard";
                      return (
                        <div className="size-selector">
                          {showStandard && (
                            <label className="size-option">
                              <input type="radio" checked readOnly />
                              {t.sizeStandard}
                            </label>
                          )}
                          {showSizes &&
                            sizeOptions.map((option) => (
                              <label key={option.value} className="size-option">
                                <input
                                  type="radio"
                                  name={`size-${dish._id}`}
                                  value={option.value}
                                  checked={selected === option.value}
                                  onChange={() =>
                                    setSizeSelections((prev) => ({
                                      ...prev,
                                      [dish._id]: option.value
                                    }))
                                  }
                                />
                                {getSizeLabel(option.value)}
                              </label>
                            ))}
                          {standardOption && sizeOptions.length > 0 && (
                            <button
                              type="button"
                              className="button ghost"
                              onClick={() =>
                                setSizeSelections((prev) => ({
                                  ...prev,
                                  [dish._id]: showStandard ? sizeOptions[0].value : "standard"
                                }))
                              }
                            >
                              {showStandard ? t.useSizes : t.useStandard}
                            </button>
                          )}
                        </div>
                      );
                    })()}
                    {getDrinkTempOptions(dish).length > 0 && (
                      <div className="size-selector">
                        {getDrinkTempOptions(dish).map((temp) => (
                          <label key={temp} className="size-option">
                            <input
                              type="radio"
                              name={`temp-${dish._id}`}
                              value={temp}
                              checked={getSelectedTemp(dish) === temp}
                              onChange={() =>
                                setTempSelections((prev) => ({
                                  ...prev,
                                  [dish._id]: temp
                                }))
                              }
                            />
                            {getTempLabel(temp)}
                          </label>
                        ))}
                      </div>
                    )}
                    <button
                      className="button"
                      onClick={() => {
                        const standardOption = getStandardOption(dish);
                        const sizeOptions = getSizeOptions(dish);
                        const selectedValue = getSelectedSize(dish, standardOption, sizeOptions);
                        const selectedOption =
                          selectedValue === "standard"
                            ? standardOption
                            : sizeOptions.find((option) => option.value === selectedValue);
                        if (!selectedOption) return;
                        addItem(
                          dish,
                          selectedOption.value,
                          selectedOption.price,
                          getSelectedTemp(dish),
                          selectedOption.priceText || ""
                        );
                      }}
                    >
                      {t.addToCart}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {step === "success" && (
        <div className="card">
          <h3>{t.orderSuccess}</h3>
          <p>{t.tableNo}：{tableNo}</p>
          <p>{t.orderSuccessTip}</p>
          {lastOrder && (
            <div className="section">
              {lastOrder.items.map((item) => (
                <div key={`${item._id}-${item.size}-${item.temp || "none"}`} className="small">
                  {getItemName(item)}
                  {item.size ? `（${getSizeLabel(item.size)}）` : ""}
                  {item.temp ? `/${getTempLabel(item.temp)}` : ""}
                  {` x ${item.quantity}（${item.priceText ? item.priceText : `￥${formatPrice(item.price)}`}）`}
                </div>
              ))}
              {lastOrder.remark && (
                <div className="small">{t.cartRemark}：{lastOrder.remark}</div>
              )}
              {lastOrder.items.some((item) => item.priceText) && (
                <div className="small">
                  {t.counterNotice}
                  {lastOrder.items
                    .filter((item) => item.priceText)
                    .map((item) => getItemName(item))
                    .join("、")}
                  。{t.counterNoticeTip}
                </div>
              )}
              <div className="small">{t.total}：￥{formatPrice(lastOrder.total)}</div>
            </div>
          )}
          <div className="section">
            <button className="button" onClick={() => setStep("menu")}>{t.continueOrder}</button>
          </div>
        </div>
      )}
    </div>
  );
}
