let units;

fetch('sample_units.json')
  .then(response => response.json())
  .then(data => {
    units = data;
    const unitSelect = document.getElementById('unit');
    for (const unit in units) {
      const opt = document.createElement('option');
      opt.value = unit;
      opt.innerText = units[unit].label;
      unitSelect.appendChild(opt);
    }
    unitSelect.addEventListener('change', populateTonnage);
    populateTonnage(); // default
  });

function populateTonnage() {
  const tonnageSelect = document.getElementById('tonnage');
  tonnageSelect.innerHTML = '';
  const unitKey = document.getElementById('unit').value;
  const options = units[unitKey].options;
  for (const ton in options) {
    const opt = document.createElement('option');
    opt.value = ton;
    opt.innerText = ton;
    tonnageSelect.appendChild(opt);
  }
}

async function generatePDF() {
  const unitKey = document.getElementById('unit').value;
  const tonnage = document.getElementById('tonnage').value;
  const unitData = units[unitKey].options[tonnage];

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  const logo = new Image();
  logo.src = "logo.png";

  logo.onload = () => {
    doc.addImage(logo, "PNG", 15, 10, 40, 25);
    doc.setFontSize(16);
    doc.text("HVAC Estimate - Cowboys A/C & Heating", 60, 20);

    doc.setFontSize(12);
    doc.text(`Unit: ${unitKey} (${tonnage}) - $${unitData.price}`, 20, 50);
    doc.text(`Coil: ${unitData.coil} - $${unitData.coil_price}`, 20, 60);
    doc.text(`Furnace: ${unitData.furnace} - $${unitData.furnace_price}`, 20, 70);
    doc.text(`SEER2: ${unitData.seer2}, EER2: ${unitData.eer2}`, 20, 80);
    doc.setFont("helvetica", "bold");
    doc.text(`TOTAL SYSTEM PRICE: $${unitData.total_price}`, 20, 95);

    doc.save("Cowboys_Estimate.pdf");
  };
}
