document.addEventListener("DOMContentLoaded", function () {
  const campaignButtons = document.querySelectorAll(".campaign-btn");

  campaignButtons.forEach((button) => {
    button.addEventListener("click", () => {
      campaignButtons.forEach((btn) => btn.classList.remove("active"));

      button.classList.add("active");

      let campaignType = button.textContent.replace("★", "").toLowerCase().trim();
      updateCampaignInfo(campaignType);
    });
  });

  const ctx = document.getElementById("streamGraph").getContext("2d");
  let streamChart;

  function initializeChart(data) {
    if (streamChart) {
      streamChart.destroy();
    }

    streamChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: ["1d", "5d", "10d", "15d", "20d", "25d", "30d"],
        datasets: [
          {
            label: "Streams",
            data: data,
            fill: true,
            backgroundColor: "rgba(52, 152, 219, 0.1)",
            borderColor: "#3498db",
            tension: 0.4,
            pointRadius: 2,
            pointBackgroundColor: "#3498db",
            pointBorderColor: "#fff",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            borderWidth: 2,
            fill: {
              target: "origin",
              above: "rgba(52, 152, 219, 0.1)",
            },
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: "easeInOutQuart",
        },
        plugins: {
          legend: {
            display: false,
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(0, 0, 0, 0.8)",
            titleColor: "#fff",
            bodyColor: "#fff",
            borderColor: "#3498db",
            borderWidth: 1,
            padding: 10,
            displayColors: false,
            callbacks: {
              label: function (context) {
                let value = context.parsed.y;
                return value >= 1000 ? (value / 1000).toFixed(1) + "k streams" : value + " streams";
              },
            },
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(255, 255, 255, 0.05)",
              drawBorder: false,
            },
            ticks: {
              color: "#a8a8b3",
              padding: 10,
              callback: function (value) {
                if (value >= 1000) {
                  return (value / 1000).toFixed(1) + "k";
                }
                return value;
              },
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#a8a8b3",
              padding: 10,
            },
          },
        },
        interaction: {
          mode: "nearest",
          axis: "x",
          intersect: false,
        },
        hover: {
          mode: "nearest",
          intersect: false,
        },
      },
    });
  }

  function updateCampaignInfo(campaign) {
    const campaignData = {
      starter: {
        streams: "15,000",
        potential: "20,000+",
        reach: "25,000-50,000+",
        price: "5.00",
        originalPrice: "12.00",
        graphData: [0, 10000, 12000, 13000, 14000, 14500, 15000],
        features: [
          { text: "No bot guarantee", enabled: true },
          { text: "Technical support", enabled: true },
          { text: "Conversion tracking <span class='highlight'>3 - 10 </span> limited", enabled: true },
          { text: "Basic audience targeting", enabled: true },
          { text: "GTAG / GTM implementation", enabled: true },
          { text: "Standard support", enabled: true },
        ],
      },
      plus: {
        streams: "25,000",
        potential: "35,000+",
        reach: "50,000-75,000+",
        price: "19.00",
        originalPrice: "30.00",
        graphData: [0, 15000, 18000, 20000, 22000, 23500, 25000],
        features: [
          { text: "No bot guarantee", enabled: true },
          { text: "Technical support", enabled: true },
          { text: "Conversion tracking <span class='highlight'>15 - 30 </span> limited", enabled: true },
          { text: "Setting up Ga4 events", enabled: true },
          { text: "Importing Ga4 events to Google ADS", enabled: true },
          { text: "Establishing basic audience targeting", enabled: true },
          { text: "Priority Support", enabled: true },
        ],
      },
      pro: {
        streams: "50,000",
        potential: "75,000+",
        reach: "100,000-150,000+",
        price: "25.00",
        originalPrice: "50.00",
        graphData: [0, 30000, 35000, 40000, 44000, 47000, 50000],
        features: [
          { text: "No bot guarantee", enabled: true },
          { text: "Technical support", enabled: true },
          { text: "Conversion tracking <span class='highlight'>45 - 70 </span> limited", enabled: true },
          { text: "Advanced audience targeting with genre optimization", enabled: true },
          { text: "Weekly reporting", enabled: true },
          { text: "Setting up ADS, Meta campaigns", enabled: true },
          { text: "Facebook, Tiktok pixels addition", enabled: true },
          { text: "Priority support with 24/7 assistance", enabled: true },
        ],
      },
      gold: {
        streams: "100,000",
        potential: "150,000+",
        reach: "200,000-300,000+",
        price: "50.00",
        originalPrice: "99.00",
        graphData: [0, 60000, 70000, 80000, 88000, 94000, 100000],
        features: [
          { text: "No bot guarantee", enabled: true },
          { text: "Bid optimization, Google Search Console, Backlink analysis", enabled: true },
          { text: "Unlimited conversion tracking", enabled: true },
          { text: "Preparation of weekly reporting dashboards", enabled: true },
          { text: "Ecommerce installation and fixing the problems of the installed Ecommerce", enabled: true },
          { text: "OCT and Google Merchant Center help", enabled: true },
          {
            text: "ADS, Meta, Tiktok, Pinterest, Apple Podcasts, Spotify, Apple Music, Youtube campaigns",
            enabled: true,
          },
          { text: "Attracting offline audience to the site", enabled: true },
          { text: "A lot of things we can't fit here :)", enabled: true },
        ],
      },
    };

    if (campaignData[campaign]) {
      const data = campaignData[campaign];

      document.querySelectorAll(".stat-card").forEach((card) => {
        const title = card.querySelector("p").textContent.toLowerCase();
        if (title.includes("guaranteed streams")) {
          card.querySelector("h2").textContent = data.streams;
        } else if (title.includes("maximum stream")) {
          card.querySelector("h2").textContent = data.potential;
        } else if (title.includes("reach")) {
          card.querySelector("h2").textContent = data.reach;
        }
      });

      document.querySelector(".campaign-name").textContent = `${
        campaign.charAt(0).toUpperCase() + campaign.slice(1)
      } campaign - `;
      document.querySelector(".original-price").textContent = `$${data.originalPrice}`;
      document.querySelector(".current-price").textContent = `$${data.price}`;

      initializeChart(data.graphData);

      const featuresList = document.querySelector(".features-list");
      featuresList.innerHTML = "";

      data.features.forEach((feature, index) => {
        setTimeout(() => {
          const featureItem = document.createElement("div");
          featureItem.className = `feature-item${!feature.enabled ? " disabled" : ""}`;

          if (feature.enabled) {
            featureItem.innerHTML = `
              <span class="checkmark">✓</span>
              <p>${feature.text}</p>
            `;
          } else {
            featureItem.innerHTML = `<p>${feature.text}</p>`;
          }

          featureItem.style.opacity = "0";
          featureItem.style.transform = "translateY(20px)";
          featuresList.appendChild(featureItem);

          requestAnimationFrame(() => {
            featureItem.style.transition = "all 0.3s ease";
            featureItem.style.opacity = "1";
            featureItem.style.transform = "translateY(0)";
          });
        }, index * 100);
      });
    }
  }

  updateCampaignInfo("starter");
});

