let units = {};

function populateProducts() {
  const manufacturer = "Robert Madden";
  const categorySelect = document.getElementById('category');
  const tonnageSelect = document.getElementById('tonnage');
  categorySelect.innerHTML = '';
  tonnageSelect.innerHTML = '';

  const productList = units;
  for (const model in productList) {
    const opt = document.createElement('option');
    opt.value = model;
    opt.innerText = productList[model].label;
    categorySelect.appendChild(opt);
  }
  populateTonnage();
}

function populateTonnage() {
  const tonnageSelect = document.getElementById('tonnage');
  tonnageSelect.innerHTML = '';
  const selectedModel = document.getElementById('category').value;
  const options = units[selectedModel].options;
  for (const ton in options) {
    const opt = document.createElement('option');
    opt.value = ton;
    opt.innerText = ton;
    tonnageSelect.appendChild(opt);
  }
  populateHandlersAndKits();
}

function populateHandlersAndKits() {
  const model = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const airHandlerSelect = document.getElementById('airHandler');
  const heatKitSelect = document.getElementById('heatKit');
  airHandlerSelect.innerHTML = '';
  heatKitSelect.innerHTML = '';
  const selected = units[model].options[tonnage];

  if (selected.airHandler) {
    selected.airHandler.forEach(handler => {
      const opt = document.createElement('option');
      opt.value = handler.model;
      opt.innerText = `${handler.model} - $${handler.price}`;
      opt.setAttribute('data-price', handler.price);
      airHandlerSelect.appendChild(opt);
    });
  }

  if (selected.heatKit) {
    selected.heatKit.forEach(kit => {
      const opt = document.createElement('option');
      opt.value = kit.model;
      opt.innerText = `${kit.model} - $${kit.price}`;
      opt.setAttribute('data-price', kit.price);
      heatKitSelect.appendChild(opt);
    });
  }
}

function generatePDF() {
  const model = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const handler = document.getElementById('airHandler').selectedOptions[0];
  const kit = document.getElementById('heatKit').selectedOptions[0];

  const unitData = units[model].options[tonnage];
  const handlerModel = handler ? handler.value : null;
  const handlerPrice = handler ? Number(handler.getAttribute('data-price')) : 0;
  const kitModel = kit ? kit.value : null;
  const kitPrice = kit ? Number(kit.getAttribute('data-price')) : 0;

  const total = unitData.total_price || (unitData.price + handlerPrice + kitPrice);

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const logo = new Image();
  logo.src = "logo.png";
  logo.onload = () => {
    doc.addImage(logo, "PNG", 15, 10, 40, 25);
    doc.setFontSize(16);
    doc.text("HVAC Estimate - Cowboys A/C & Heating", 60, 20);
    doc.setFontSize(12);
    doc.text(`Model: ${model} (${tonnage}) - $${unitData.price}`, 20, 40);
    if (unitData.coil) doc.text(`Coil: ${unitData.coil} - $${unitData.coil_price}`, 20, 50);
    if (unitData.furnace) doc.text(`Furnace: ${unitData.furnace} - $${unitData.furnace_price}`, 20, 60);
    if (handlerModel) doc.text(`Air Handler: ${handlerModel} - $${handlerPrice}`, 20, 70);
    if (kitModel) doc.text(`Heat Kit: ${kitModel} - $${kitPrice}`, 20, 80);
    if (unitData.seer2) doc.text(`SEER2: ${unitData.seer2}, EER2: ${unitData.eer2 || '-'}, HSPF2: ${unitData.hspf2 || '-'}`, 20, 90);
    if (unitData.tax_credit) doc.text("✅ 25C Tax Credit Eligible", 20, 100);
    doc.text(`AHRI #: ${unitData.ahri}`, 20, 110);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL SYSTEM PRICE: $${total}`, 20, 125);
    doc.save("Cowboys_Estimate.pdf");
  };
}

function updateDateTime() {
  const now = new Date();
  document.getElementById("datetime").innerText = now.toLocaleString();
  document.getElementById("last-updated").innerText = "Last Updated: " + now.toLocaleString();
}

function fetchWeather() {
  const apiKey = '581ba534f9eb634115115d34fc644292';
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=78216,us&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      document.getElementById('weather').innerText = `San Antonio: ${temp}°F`;
    })
    .catch(() => {
      document.getElementById('weather').innerText = "Weather unavailable";
    });
}

window.onload = () => {
  fetch("data/robert_madden.json")
    .then(res => res.json())
    .then(data => {
      units = data;
      populateProducts();
    });

  document.getElementById('category').addEventListener('change', populateTonnage);
  document.getElementById('tonnage').addEventListener('change', populateHandlersAndKits);
  setInterval(updateDateTime, 1000);
  updateDateTime();
  fetchWeather();
};

