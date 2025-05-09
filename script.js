const units = {
  "Robert Madden": {
    "C5H3V": {
      label: "C5H3V Variable Speed Heat Pump",
      options: {
        "2 Ton": {
          price: 2875,
          airHandler: [
            { model: "FTMA5X24A1A", price: 1175 },
            { model: "FCMA5X24A1A", price: 1225 }
          ],
          heatKit: [
            { model: "KFCEH0401N10", price: 225 },
            { model: "KFCEH0501N10", price: 245 }
          ],
          seer2: 17.5,
          eer2: 12.0,
          hspf2: 8.1,
          ahri: "217000300",
          tax_credit: true
        },
        "3 Ton": {
          price: 3125,
          airHandler: [
            { model: "FTMA5X36A1A", price: 1245 },
            { model: "FCMA5X36A1A", price: 1295 }
          ],
          heatKit: [
            { model: "KFCEH0701N10", price: 265 },
            { model: "KFCEH0801N10", price: 280 }
          ],
          seer2: 18.0,
          eer2: 12.5,
          hspf2: 8.5,
          ahri: "217000301",
          tax_credit: true
        }
      }
    }
  }
};

function populateProducts() {
  const categorySelect = document.getElementById('category');
  const tonnageSelect = document.getElementById('tonnage');
  categorySelect.innerHTML = '';
  tonnageSelect.innerHTML = '';
  const selectedMfr = document.getElementById('manufacturer').value;
  const productList = units[selectedMfr];
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
  const selectedMfr = document.getElementById('manufacturer').value;
  const selectedModel = document.getElementById('category').value;
  const options = units[selectedMfr][selectedModel].options;
  for (const ton in options) {
    const opt = document.createElement('option');
    opt.value = ton;
    opt.innerText = ton;
    tonnageSelect.appendChild(opt);
  }
  populateHandlersAndKits();
}

function populateHandlersAndKits() {
  const selectedMfr = document.getElementById('manufacturer').value;
  const selectedModel = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const airHandlerSelect = document.getElementById('airHandler');
  const heatKitSelect = document.getElementById('heatKit');
  airHandlerSelect.innerHTML = '';
  heatKitSelect.innerHTML = '';
  const selected = units[selectedMfr][selectedModel].options[tonnage];

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
  const mfr = document.getElementById('manufacturer').value;
  const model = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const handler = document.getElementById('airHandler').selectedOptions[0];
  const kit = document.getElementById('heatKit').selectedOptions[0];

  const unitData = units[mfr][model].options[tonnage];
  const handlerModel = handler ? handler.value : null;
  const handlerPrice = handler ? Number(handler.getAttribute('data-price')) : 0;
  const kitModel = kit ? kit.value : null;
  const kitPrice = kit ? Number(kit.getAttribute('data-price')) : 0;

  const total = unitData.price + handlerPrice + kitPrice;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const logo = new Image();
  logo.src = "logo.png";
  logo.onload = () => {
    doc.addImage(logo, "PNG", 15, 10, 40, 25);
    doc.setFontSize(16);
    doc.text("HVAC Estimate - Cowboys A/C & Heating", 60, 20);
    doc.setFontSize(12);
    doc.text(`Manufacturer: ${mfr}`, 20, 40);
    doc.text(`Model: ${model} (${tonnage}) - $${unitData.price}`, 20, 50);
    doc.text(`SEER2: ${unitData.seer2}, EER2: ${unitData.eer2}, HSPF2: ${unitData.hspf2}`, 20, 60);
    if (handlerModel) doc.text(`Air Handler: ${handlerModel} - $${handlerPrice}`, 20, 70);
    if (kitModel) doc.text(`Heat Kit: ${kitModel} - $${kitPrice}`, 20, 80);
    if (unitData.tax_credit) doc.text("✅ 25C Tax Credit Eligible", 20, 90);
    doc.text(`AHRI #: ${unitData.ahri}`, 20, 100);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL SYSTEM PRICE: $${total}`, 20, 115);
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
  const manufacturerSelect = document.getElementById('manufacturer');
  for (const mfr in units) {
    const opt = document.createElement('option');
    opt.value = mfr;
    opt.innerText = mfr;
    manufacturerSelect.appendChild(opt);
  }
  manufacturerSelect.addEventListener('change', populateProducts);
  document.getElementById('category').addEventListener('change', populateTonnage);
  document.getElementById('tonnage').addEventListener('change', populateHandlersAndKits);
  populateProducts();
  setInterval(updateDateTime, 1000);
  updateDateTime();
  fetchWeather();
};

