
let units;

fetch('sample_units.json')
  .then(response => response.json())
  .then(data => {
    units = data;
    const categorySelect = document.getElementById('category');
    for (const category in units) {
      const opt = document.createElement('option');
      opt.value = category;
      opt.innerText = units[category].label;
      categorySelect.appendChild(opt);
    }
    categorySelect.addEventListener('change', populateTonnage);
    populateTonnage();
  });

function populateTonnage() {
  const tonnageSelect = document.getElementById('tonnage');
  tonnageSelect.innerHTML = '';
  const categoryKey = document.getElementById('category').value;
  const options = units[categoryKey].options;
  for (const ton in options) {
    const opt = document.createElement('option');
    opt.value = ton;
    opt.innerText = ton;
    tonnageSelect.appendChild(opt);
  }
}

async function generatePDF() {
  const categoryKey = document.getElementById('category').value;
  const tonnage = document.getElementById('tonnage').value;
  const unitData = units[categoryKey].options[tonnage];

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logo = new Image();
  logo.src = "logo.png";

  logo.onload = () => {
    doc.addImage(logo, "PNG", 15, 10, 40, 25);
    doc.setFontSize(16);
    doc.text("HVAC Estimate - Cowboys A/C & Heating", 60, 20);

    doc.setFontSize(12);
    doc.text(`Unit: ${categoryKey} (${tonnage}) - $${unitData.price}`, 20, 50);
    doc.text(`Coil: ${unitData.coil} - $${unitData.coil_price}`, 20, 60);
    doc.text(`Furnace: ${unitData.furnace} - $${unitData.furnace_price}`, 20, 70);
    doc.text(`SEER2: ${unitData.seer2}, EER2: ${unitData.eer2}`, 20, 80);
    doc.text(`AHRI #: ${unitData.ahri}`, 20, 90);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL SYSTEM PRICE: $${unitData.total_price}`, 20, 105);

    doc.save("Cowboys_Estimate.pdf");
  };
}

function updateDateTime() {
  const now = new Date();
  document.getElementById('datetime').innerText = now.toLocaleString();
}

function fetchWeather() {
  const city = '78216';
  const apiKey = '581ba534f9eb634115115d34fc644292';
  fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${city},us&appid=${apiKey}&units=imperial`)
    .then(res => res.json())
    .then(data => {
      const temp = Math.round(data.main.temp);
      document.getElementById('weather').innerText = `San Antonio: ${temp}°F`;
    })
    .catch(() => {
      document.getElementById('weather').innerText = `San Antonio: weather unavailable`;
    });
}

setInterval(updateDateTime, 1000);
updateDateTime();
fetchWeather();
