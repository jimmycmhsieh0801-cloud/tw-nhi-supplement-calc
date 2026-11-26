function calcNhiSupplement(type, payout, insuredSalary = 42000) {
  const amt = Math.min(10000000, Math.max(0, Number(payout) || 0));
  let threshold = 20000;
  let taxable = 0;

  if (type === "parttime") {
    threshold = 29500;
    taxable = amt >= threshold ? amt : 0;
  } else if (type === "bonus") {
    threshold = Math.max(29500, Number(insuredSalary) || 42000) * 4;
    taxable = Math.max(0, amt - threshold);
  } else {
    threshold = 20000;
    taxable = amt >= threshold ? amt : 0;
  }

  const fee = Math.round(taxable * 0.0211);
  const net = Math.max(0, Math.round(Number(payout) || 0) - fee);
  const triggered = taxable > 0;
  return { threshold, taxable, fee, net, triggered };
}
if (typeof document !== "undefined") {
  const typeEl = document.getElementById("incomeType");
  const payoutEl = document.getElementById("payoutInput");
  const insEl = document.getElementById("insuredSalary");
  const bonusRow = document.getElementById("bonusRow");
  function render() {
    bonusRow.classList.toggle("hidden", typeEl.value !== "bonus");
    const res = calcNhiSupplement(typeEl.value, payoutEl.value, insEl.value);
    const thEl = document.getElementById("threshEl");
    thEl.textContent = res.triggered ? `已達標 (>${res.threshold.toLocaleString()}元)` : `免扣 (門檻 ${res.threshold.toLocaleString()}元)`;
    thEl.className = "value " + (res.triggered ? "warn" : "good");
    document.getElementById("nhiFeeEl").textContent = `NT$ ${res.fee.toLocaleString()}`;
    document.getElementById("netGetEl").textContent = `NT$ ${res.net.toLocaleString()}`;
  }
  [typeEl, payoutEl, insEl].forEach(el => el.addEventListener("input", render));
  render();
}
if (typeof module !== "undefined" && module.exports) module.exports = { calcNhiSupplement };
