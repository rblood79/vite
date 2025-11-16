// Card Component
function Card({ title, info, chartData, tableData }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
      {/* Card Title */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
      </div>

      {/* Info Section */}
      <div className="bg-slate-750 border-b border-slate-600">
        <div className="grid grid-cols-2 divide-x divide-slate-600">
          {info.map((item, idx) => (
            <div key={idx} className="px-4 py-3">
              <div className="text-xs text-slate-400 mb-1">{item.label}</div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-slate-200">{item.value}</span>
                <span className="text-xs text-slate-300">{item.unit}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chart Section */}
      <div className="px-6 py-6 h-48 flex items-end justify-between gap-2">
        {chartData.map((data, idx) => {
          const maxValue = Math.max(...data.values);
          return (
            <div key={idx} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end justify-center gap-1 h-32">
                {data.values.map((val, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-gradient-to-t from-blue-400 to-blue-600 rounded-t opacity-70 hover:opacity-100 transition-opacity"
                    style={{ height: `${(val / maxValue) * 100}%` }}
                  ></div>
                ))}
              </div>
              <span className="text-xs text-slate-400 text-center">{data.date}</span>
            </div>
          );
        })}
      </div>

      {/* Table Section */}
      <div className="bg-slate-700/50 border-t border-slate-600">
        <table className="w-full text-sm">
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-600 last:border-b-0">
                <td className="px-4 py-3 text-slate-300 font-medium w-20">{row.label}</td>
                <td className="px-4 py-3 text-slate-200">{row.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function App() {
  const cardConfigs = [
    {
      id: 1,
      title: "OCP Rate",
      info: [
        { label: "종류", value: "계수", unit: "714,125건/1,424,523건" },
        { label: "기준", value: "2년수", unit: "15,250건/26,110건" }
      ],
      chartData: [
        { date: "11-09", values: [50, 100, 80, 120] },
        { date: "11-10", values: [60, 110, 90, 130] },
        { date: "11-11", values: [55, 105, 85, 125] },
        { date: "11-12", values: [65, 115, 95, 135] },
        { date: "12-11", values: [70, 120, 100, 140] },
        { date: "13-11", values: [75, 125, 105, 145] },
        { date: "14-11", values: [80, 130, 110, 150] },
        { date: "14-15", values: [85, 135, 115, 155] }
      ],
      tableData: [
        { label: "제품명", value: "STML283T" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 2,
      title: "OCP",
      info: [
        { label: "종류", value: "계수", unit: "58%" },
        { label: "기준", value: "2년수", unit: "58%" }
      ],
      chartData: [
        { date: "11-09", values: [40, 80, 60, 100] },
        { date: "11-10", values: [50, 90, 70, 110] },
        { date: "11-11", values: [45, 85, 65, 105] },
        { date: "11-12", values: [55, 95, 75, 115] },
        { date: "12-11", values: [60, 100, 80, 120] },
        { date: "13-11", values: [65, 105, 85, 125] },
        { date: "14-11", values: [70, 110, 90, 130] },
        { date: "14-15", values: [75, 115, 95, 135] }
      ],
      tableData: [
        { label: "제품명", value: "STML283T" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 3,
      title: "Quality Score",
      info: [
        { label: "종류", value: "계수", unit: "92%" },
        { label: "기준", value: "목표", unit: "95%" }
      ],
      chartData: [
        { date: "11-09", values: [70, 110, 95, 140] },
        { date: "11-10", values: [75, 115, 100, 145] },
        { date: "11-11", values: [72, 112, 97, 142] },
        { date: "11-12", values: [78, 118, 103, 148] },
        { date: "12-11", values: [80, 120, 105, 150] },
        { date: "13-11", values: [82, 122, 107, 152] },
        { date: "14-11", values: [85, 125, 110, 155] },
        { date: "14-15", values: [88, 128, 113, 158] }
      ],
      tableData: [
        { label: "제품명", value: "EDGE" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 4,
      title: "Yield Rate",
      info: [
        { label: "종류", value: "계수", unit: "87%" },
        { label: "기준", value: "목표", unit: "90%" }
      ],
      chartData: [
        { date: "11-09", values: [45, 85, 70, 115] },
        { date: "11-10", values: [50, 90, 75, 120] },
        { date: "11-11", values: [48, 88, 73, 118] },
        { date: "11-12", values: [55, 95, 80, 125] },
        { date: "12-11", values: [58, 98, 83, 128] },
        { date: "13-11", values: [60, 100, 85, 130] },
        { date: "14-11", values: [62, 102, 87, 132] },
        { date: "14-15", values: [65, 105, 90, 135] }
      ],
      tableData: [
        { label: "제품명", value: "BULK" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 5,
      title: "Defect Rate",
      info: [
        { label: "종류", value: "계수", unit: "2.3%" },
        { label: "기준", value: "목표", unit: "1.5%" }
      ],
      chartData: [
        { date: "11-09", values: [30, 70, 50, 90] },
        { date: "11-10", values: [35, 75, 55, 95] },
        { date: "11-11", values: [32, 72, 52, 92] },
        { date: "11-12", values: [38, 78, 58, 98] },
        { date: "12-11", values: [40, 80, 60, 100] },
        { date: "13-11", values: [42, 82, 62, 102] },
        { date: "14-11", values: [44, 84, 64, 104] },
        { date: "14-15", values: [46, 86, 66, 106] }
      ],
      tableData: [
        { label: "제품명", value: "PREMIUM" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 6,
      title: "Efficiency",
      info: [
        { label: "종류", value: "계수", unit: "96.5%" },
        { label: "기준", value: "목표", unit: "98%" }
      ],
      chartData: [
        { date: "11-09", values: [80, 120, 105, 155] },
        { date: "11-10", values: [85, 125, 110, 160] },
        { date: "11-11", values: [82, 122, 107, 157] },
        { date: "11-12", values: [88, 128, 113, 163] },
        { date: "12-11", values: [90, 130, 115, 165] },
        { date: "13-11", values: [92, 132, 117, 167] },
        { date: "14-11", values: [94, 134, 119, 169] },
        { date: "14-15", values: [96, 136, 121, 171] }
      ],
      tableData: [
        { label: "제품명", value: "STANDARD" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back! Here's your analytics overview.</p>
        </div>

        {/* Alarm Area */}
        <div className="mb-8 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/50 rounded-lg p-4 flex items-center gap-4">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-red-300 font-semibold mb-1">Alert: System Notification</h3>
            <p className="text-red-200/80 text-sm">Quality Score threshold exceeded. Immediate action required on EDGE product line.</p>
          </div>
          <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded font-medium transition-colors">
            View Details
          </button>
        </div>

        {/* Cards Grid - 3 columns x 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cardConfigs.map((config) => (
            <Card
              key={config.id}
              title={config.title}
              info={config.info}
              chartData={config.chartData}
              tableData={config.tableData}
            />
          ))}
        </div>

        {/* Footer Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 mb-2">Last Updated</p>
            <p className="text-white text-2xl font-semibold">Just now</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 mb-2">Status</p>
            <p className="text-green-400 text-2xl font-semibold">✓ All Systems Operational</p>
          </div>
          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700">
            <p className="text-slate-400 mb-2">Uptime</p>
            <p className="text-white text-2xl font-semibold">99.9%</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
