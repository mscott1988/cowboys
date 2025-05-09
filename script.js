const units = {
  "Robert Madden": {
    "C5A1V": {
      label: "C5A1V Variable Speed AC",
      options: {
        "2 Ton": {
          price: 2379,
          coil: "EAM5X24M14A",
          coil_price: 445,
          furnace: "G80CTL0701412B",
          furnace_price: 1460,
          seer2: 17.0,
          eer2: 10.5,
          ahri: "215691194",
          total_price: 4284,
          tax_credit: true
        },
        "3 Ton": {
          price: 2983,
          coil: "EAM5X36M17A",
          coil_price: 475,
          furnace: "G80CTL0902120B",
          furnace_price: 1580,
          seer2: 18.0,
          eer2: 11.0,
          ahri: "215696475",
          total_price: 5038,
          tax_credit: true
        }
      }
    },
    "N5A5S": {
      label: "N5A5S Single-Stage AC",
      options: {
        "2 Ton": {
          price: 1375,
          coil: "EAM4X24L17A",
          coil_price: 328,
          furnace: "N80ESN0451412A",
          furnace_price: 599,
          seer2: 14.3,
          eer2: 11.7,
          ahri: "213829151",
          total_price: 2302,
          tax_credit: false
        },
        "3 Ton": {
          price: 1480,
          coil: "EAM4X36L17A",
          coil_price: 352,
          furnace: "N80ESN0701716A",
          furnace_price: 620,
          seer2: 14.5,
          eer2: 12.0,
          ahri: "213829155",
          total_price: 2452,
          tax_credit: false
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
}

function generatePDF() {
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
    if (unitData.tax_credit) doc.text("✅ 25C Tax Credit Eligible", 20, 90);
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
  populateProducts();
  setInterval(updateDateTime, 1000);
  updateDateTime();
  fetchWeather();
};
