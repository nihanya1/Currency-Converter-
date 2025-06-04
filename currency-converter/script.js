const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const result = document.getElementById("result");

const currencies = ["USD", "EUR", "INR", "GBP", "JPY", "AUD", "CAD"];

window.onload = () => {
  currencies.forEach(curr => {
    const option1 = document.createElement("option");
    const option2 = document.createElement("option");
    option1.value = option2.value = curr;
    option1.text = option2.text = curr;
    fromCurrency.add(option1);
    toCurrency.add(option2);
  });
  fromCurrency.value = "USD";
  toCurrency.value = "INR";
};

async function convertCurrency() {
  const amount = document.getElementById("amount").value;
  const from = fromCurrency.value;
  const to = toCurrency.value;

  if (!amount || isNaN(amount)) {
    alert("Please enter a valid amount");
    return;
  }

  const API_KEY = "https://api.exchangerate-api.com/v4/latest/";
  const url = `${API_KEY}${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];
    const converted = (amount * rate).toFixed(2);
    result.innerText = `${amount} ${from} = ${converted} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching exchange rate. Please try again.";
  }
}
