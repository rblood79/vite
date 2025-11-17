import { useState } from 'react';
import PropTypes from 'prop-types';

// Card Component
function Card({ title, info, chartData, tableData }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
      {/* Card Title */}
      <div className="bg-slate-700 px-6 py-4">
        <h2 className="text-white text-xl font-bold">{title}</h2>
      </div>

      {/* Info Section - 6 columns x 2 rows */}
      <div className="bg-slate-750 border-b border-slate-600 px-6 py-3">
        {info.map((item, idx) => (
          <div key={idx}>
            {/* Row 1 */}
            <div className="flex items-center gap-1 mb-2 text-xs">
              <span className="text-slate-400 font-medium w-8">{item.label}</span>
              <span className="text-slate-300 w-16 truncate">{item.title1}</span>
              <span className="text-blue-300 font-medium flex-1 text-center">{item.value1}</span>
              <span className="text-slate-400 font-medium w-8">{item.label2}</span>
              <span className="text-slate-300 w-16 truncate">{item.title2}</span>
              <span className="text-blue-300 font-medium flex-1 text-center">{item.value2}</span>
            </div>
            {/* Row 2 */}
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-500 w-8">기준</span>
              <span className="text-slate-400 w-16 truncate">{item.detail1}</span>
              <span className="text-slate-300 flex-1 text-center">{item.detailValue1}</span>
              <span className="text-slate-500 w-8">기준</span>
              <span className="text-slate-400 w-16 truncate">{item.detail2}</span>
              <span className="text-slate-300 flex-1 text-center">{item.detailValue2}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="px-6 py-6 flex items-end justify-between gap-4 bg-gradient-to-br from-slate-800 to-slate-700">
        {/* Chart */}
        <div className="flex-1 h-48 flex items-end justify-between gap-2">
          {chartData.map((data, idx) => {
            const maxTotalValue = Math.max(...chartData.map(d => d.values.reduce((sum, val) => sum + val, 0)));
            const colors = [
              'bg-violet-600',
              'bg-indigo-600',
              'bg-purple-500',
              'bg-pink-500',
            ];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative h-32 flex items-end">
                  <div className="w-full h-full bg-slate-700/50 rounded-t flex flex-col justify-end overflow-hidden">
                    {data.values.map((val, i) => {
                      const percentage = (val / maxTotalValue) * 100;
                      return (
                        <div
                          key={i}
                          className={`w-full transition-opacity hover:opacity-100 opacity-80 ${colors[i % colors.length]}`}
                          style={{ height: `${percentage}%` }}
                        ></div>
                      );
                    })}
                  </div>
                </div>
                <span className="text-xs text-slate-400 text-center">{data.date}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-2 min-w-max pl-4 border-l border-slate-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-violet-600 rounded"></div>
            <span className="text-xs text-slate-300">Data 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-indigo-600 rounded"></div>
            <span className="text-xs text-slate-300">Data 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded"></div>
            <span className="text-xs text-slate-300">Data 3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-pink-500 rounded"></div>
            <span className="text-xs text-slate-300">Data 4</span>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-slate-700/50 border-t border-slate-600">
        <table className="w-full text-sm">
          <tbody>
            {tableData.map((row, idx) => (
              <tr key={idx} className="border-b border-slate-600 last:border-b-0 hover:bg-slate-700/50 transition-colors">
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

Card.propTypes = {
  title: PropTypes.string.isRequired,
  info: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      title1: PropTypes.string.isRequired,
      value1: PropTypes.string.isRequired,
      label2: PropTypes.string.isRequired,
      title2: PropTypes.string.isRequired,
      value2: PropTypes.string.isRequired,
      detail1: PropTypes.string.isRequired,
      detailValue1: PropTypes.string.isRequired,
      detail2: PropTypes.string.isRequired,
      detailValue2: PropTypes.string.isRequired,
    })
  ).isRequired,
  chartData: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      values: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState(0);

  const tabs = [
    { id: 0, name: 'Summary', icon: '📊' },
    { id: 1, name: 'GR', icon: '📈' },
    { id: 2, name: 'SHP', icon: '📋' },
    { id: 3, name: 'POL', icon: '⚙️' },
    { id: 4, name: 'CL', icon: '👥' },
    { id: 5, name: 'EPI', icon: '📝' },
    { id: 6, name: 'MI', icon: '❓' }
  ];

  const cardTabs = [
    { id: 0, name: 'X Parameter' },
    { id: 1, name: 'Y Parameter' }
  ];

  const cardConfigs = [
    {
      id: 1,
      title: "OCP Rate",
      info: [
        { 
          label: "누적", title1: "OCP Rate", value1: "50%", 
          label2: "일", title2: "OCP Rate", value2: "58%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
        { 
          label: "누적", title1: "OCP", value1: "58%", 
          label2: "일", title2: "OCP", value2: "58%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
        { 
          label: "누적", title1: "Quality Score", value1: "92%", 
          label2: "일", title2: "Quality Score", value2: "95%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
        { 
          label: "누적", title1: "Yield Rate", value1: "87%", 
          label2: "일", title2: "Yield Rate", value2: "90%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
        { 
          label: "누적", title1: "Defect Rate", value1: "2.3%", 
          label2: "일", title2: "Defect Rate", value2: "1.5%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
        { 
          label: "누적", title1: "Efficiency", value1: "96.5%", 
          label2: "일", title2: "Efficiency", value2: "98%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
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
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-8">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">Dashboard</h1>
          <p className="text-slate-400 text-lg">Welcome back! Here&apos;s your analytics overview.</p>
        </div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex gap-2 bg-slate-900 p-2 rounded-lg border border-slate-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-md font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-lg border border-slate-700'
                    : 'text-slate-500 hover:text-slate-300 hover:bg-slate-850'
                }`}
              >
                <span className="text-xl">{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alarm Area */}
        <div className="mb-8 bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-700/50 rounded-lg p-4 flex items-center gap-4">
          <div className="text-2xl">⚠️</div>
          <div className="flex-1">
            <h3 className="text-red-300 font-semibold mb-1">Alert: System Notification</h3>
            <p className="text-red-200/80 text-sm">Quality Score threshold exceeded. Immediate action required on EDGE product line.</p>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 0 && (
            <>
              <div className="flex gap-6">
                {/* Card Tabs - Vertical with rotated text */}
                <div className="flex-shrink-0">
                  <div className="flex flex-col gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                    {cardTabs.map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveCardTab(tab.id)}
                        className={`px-3 py-1 rounded-md font-medium transition-all ${
                          activeCardTab === tab.id
                            ? 'bg-slate-800 text-white shadow-lg border border-slate-700'
                            : 'text-slate-500 hover:text-slate-300 hover:bg-slate-850'
                        }`}
                      >
                        <span className="writing-mode-vertical-rl transform rotate-180">{tab.name}</span>
                      </button>
                    ))}
                  </div>
                </div>                  {/* Card Tab Content */}
                  <div className="flex-1">
                    {activeCardTab === 0 && (
                      <>
                        {/* Cards Grid - 2 columns (xl and below), 3 columns (2xl and above) */}
                        <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
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
                          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
                            <p className="text-slate-400 mb-2">Last Updated</p>
                            <p className="text-white text-2xl font-semibold">Just now</p>
                          </div>
                          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
                            <p className="text-slate-400 mb-2">Status</p>
                            <p className="text-emerald-400 text-2xl font-semibold">✓ All Systems Operational</p>
                          </div>
                          <div className="bg-slate-800 rounded-lg p-6 border border-slate-700 shadow-sm hover:shadow-lg transition-shadow">
                            <p className="text-slate-400 mb-2">Uptime</p>
                            <p className="text-white text-2xl font-semibold">99.9%</p>
                          </div>
                        </div>
                      </>
                    )}

                    {activeCardTab === 1 && (
                      <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                        <h2 className="text-2xl font-bold text-white mb-2">Y Parameter</h2>
                        <p className="text-slate-400">Y Parameter content coming soon...</p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}

            {activeTab === 1 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">📈</span>
                <h2 className="text-2xl font-bold text-white mb-2">GR</h2>
                <p className="text-slate-400">GR content coming soon...</p>
              </div>
            )}

            {activeTab === 2 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">📋</span>
                <h2 className="text-2xl font-bold text-white mb-2">SHP</h2>
                <p className="text-slate-400">SHP content coming soon...</p>
              </div>
            )}

            {activeTab === 3 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">⚙️</span>
                <h2 className="text-2xl font-bold text-white mb-2">POL</h2>
                <p className="text-slate-400">POL content coming soon...</p>
              </div>
            )}

            {activeTab === 4 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">👥</span>
                <h2 className="text-2xl font-bold text-white mb-2">CL</h2>
                <p className="text-slate-400">CL content coming soon...</p>
              </div>
            )}

            {activeTab === 5 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">📝</span>
                <h2 className="text-2xl font-bold text-white mb-2">EPI</h2>
                <p className="text-slate-400">EPI content coming soon...</p>
              </div>
            )}

            {activeTab === 6 && (
              <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
                <span className="text-6xl mb-4 block">❓</span>
                <h2 className="text-2xl font-bold text-white mb-2">MI</h2>
                <p className="text-slate-400">MI content coming soon...</p>
              </div>
            )}
      </div>
    </div>
  )
}

export default App;
