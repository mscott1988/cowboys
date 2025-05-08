
let units;

fetch('sample_units.json')
  .then(response => response.json())
  .then(data => {
    units = data;
    const manufacturerSelect = document.getElementById('manufacturer');
    for (const mfr in units) {
      const opt = document.createElement('option');
      opt.value = mfr;
      opt.innerText = mfr;
      manufacturerSelect.appendChild(opt);
    }
    manufacturerSelect.addEventListener('change', populateProducts);
    populateProducts();
  });

function populateProducts() {
  const categorySelect = document.getElementById('category');
  categorySelect.innerHTML = '';
  const tonnageSelect = document.getElementById('tonnage');
  tonnageSelect.innerHTML = '';

  const selectedMfr = document.getElementById('manufacturer').value;
  const productList = units[selectedMfr];

  for (const model in productList) {
    const opt = document.createElement('option');
    opt.value = model;
    opt.innerText = productList[model].label;
    categorySelect.appendChild(opt);
  }
  categorySelect.addEventListener('change', populateTonnage);
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
}

async function generatePDF() {
  const mfr = document.getElementById('manufacturer').value;
  const model = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const unitData = units[mfr][model].options[tonnage];

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
    doc.text(`Coil: ${unitData.coil} - $${unitData.coil_price}`, 20, 60);
    doc.text(`Furnace: ${unitData.furnace} - $${unitData.furnace_price}`, 20, 70);
    doc.text(`SEER2: ${unitData.seer2}, EER2: ${unitData.eer2}`, 20, 80);
    if (unitData.tax_credit) {
      doc.text("✅ 25C Tax Credit Eligible", 20, 90);
    }
    doc.text(`AHRI #: ${unitData.ahri}`, 20, 100);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL SYSTEM PRICE: $${unitData.total_price}`, 20, 115);
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
  const city = '78216';
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      document.getElementById('weather').innerText = `San Antonio: ${temp}°F`;
    })
    .catch(() => {
      document.getElementById('weather').innerText = "Weather unavailable";
    });
}
setInterval(updateDateTime, 1000);
updateDateTime();
fetchWeather();
