// Function to format dates to MM/DD or M/D format
function formatDate(dateStr) {
    const [year, month, day] = dateStr.split('-');
    return `${parseInt(month)}/${parseInt(day)}`; // Converts YYYY-MM-DD to M/D or MM/DD
}

// Function to format numbers to a more user-friendly format
function formatVolume(volume) {
    if (volume >= 1e6) {
        return (volume / 1e6).toFixed(1) + 'M'; // Formats millions
    } else if (volume >= 1e3) {
        return (volume / 1e3).toFixed(1) + 'k'; // Formats thousands
    } else {
        return volume; // If less than a thousand, return as is
    }
}

// Function to format prices to two decimal points and add a dollar sign
function formatPrice(price) {
    return `$${parseFloat(price).toFixed(2)}`; // Formats the price to two decimal points with a $
}

async function fetchStockData() {
    const apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=IBM&apikey=demo';
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const timeSeries = data['Time Series (Daily)'];
        const stockTableBody = document.getElementById('stockTableBody');

        for (let date in timeSeries) {
            const dailyData = timeSeries[date];
            const row = document.createElement('tr');
            row.className = "border-b border-gray-200 hover:bg-gray-100 cursor-pointer";
            row.dataset.date = date;

            row.innerHTML = `
                <td class="py-3 px-6 text-left whitespace-nowrap">${formatDate(date)}</td>
                <td class="py-3 px-6 text-right">${formatPrice(dailyData['1. open'])}</td>
                <td class="py-3 px-6 text-right">${formatPrice(dailyData['2. high'])}</td>
                <td class="py-3 px-6 text-right">${formatPrice(dailyData['3. low'])}</td>
                <td class="py-3 px-6 text-right">${formatPrice(dailyData['4. close'])}</td>
                <td class="py-3 px-6 text-right">${formatVolume(parseInt(dailyData['5. volume']))}</td>
            `;

            const dropdownRow = document.createElement('tr');
            dropdownRow.className = "hidden intraday-dropdown";
            dropdownRow.innerHTML = `
                <td colspan="6" class="p-4 bg-gray-100">
                    <div id="intraday-${date}" class="text-gray-700 text-sm">
                        <!-- Intraday data will be inserted here -->
                        Loading intraday data...
                    </div>
                </td>
            `;

            row.addEventListener('click', () => toggleDropdown(row, dropdownRow, date));

            stockTableBody.appendChild(row);
            stockTableBody.appendChild(dropdownRow);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function fetchIntradayData(date) {
    const apiUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const timeSeries = data['Time Series (5min)'];
        const intradayDiv = document.getElementById(`intraday-${date}`);

        if (timeSeries) {
            let intradayTable = `
                <table class="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                    <thead>
                        <tr class="bg-gray-300 text-gray-600 uppercase text-xs leading-normal">
                            <th class="py-2 px-4 text-left">Time</th>
                            <th class="py-2 px-4 text-right">Open</th>
                            <th class="py-2 px-4 text-right">High</th>
                            <th class="py-2 px-4 text-right">Low</th>
                            <th class="py-2 px-4 text-right">Close</th>
                            <th class="py-2 px-4 text-right">Volume</th>
                        </tr>
                    </thead>
                    <tbody class="text-gray-600 text-xs font-light">
            `;

            for (let time in timeSeries) {
                if (time.startsWith(date)) {
                    const intradayData = timeSeries[time];
                    intradayTable += `
                        <tr class="border-b border-gray-200 hover:bg-gray-100">
                            <td class="py-2 px-4 text-left">${time}</td>
                            <td class="py-2 px-4 text-right">${formatPrice(intradayData['1. open'])}</td>
                            <td class="py-2 px-4 text-right">${formatPrice(intradayData['2. high'])}</td>
                            <td class="py-2 px-4 text-right">${formatPrice(intradayData['3. low'])}</td>
                            <td class="py-2 px-4 text-right">${formatPrice(intradayData['4. close'])}</td>
                            <td class="py-2 px-4 text-right">${formatVolume(parseInt(intradayData['5. volume']))}</td>
                        </tr>
                    `;
                }
            }

            intradayTable += '</tbody></table>';
            intradayDiv.innerHTML = intradayTable;
        } else {
            intradayDiv.textContent = 'No intraday data available for this date.';
        }
    } catch (error) {
        console.error('Error fetching intraday data:', error);
    }
}

function toggleDropdown(row, dropdownRow, date) {
    const isVisible = dropdownRow.classList.contains('hidden');
    const otherDropdowns = document.querySelectorAll('.intraday-dropdown');

    otherDropdowns.forEach(d => {
        if (d !== dropdownRow) {
            d.classList.add('hidden');
        }
    });

    if (isVisible) {
        dropdownRow.classList.remove('hidden');
        fetchIntradayData(date);
    } else {
        dropdownRow.classList.add('hidden');
    }
}

fetchStockData();
