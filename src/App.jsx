import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Card Component
function Card({ title, info, chartData, tableData, barChartData }) {
  return (
    <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:shadow-xl transition-shadow">
      {/* Card Title */}
      <div className="bg-slate-700 px-4 py-2">
        <h2 className="text-white text-md font-bold">{title}</h2>
      </div>

      {/* Info Section - 6 columns x 2 rows */}
      <div className="bg-slate-750 border-b border-slate-600 px-4 py-2">
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
      <div className="px-4 py-3 flex items-center justify-between gap-4 bg-gradient-to-br from-slate-800 to-slate-700">
        {/* Chart */}
        <div className="flex-1 h-32 flex items-end justify-between gap-2">
          {chartData.map((data, idx) => {
            const maxTotalValue = Math.max(...chartData.map(d => d.values.reduce((sum, val) => sum + val, 0)));
            const colors = [
              'bg-sky-400',
              'bg-blue-400',
              'bg-yellow-400',
              'bg-orange-400',
              'bg-green-400',
            ];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative h-20 flex items-end">
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
            <div className="w-3 h-3 bg-sky-400 rounded"></div>
            <span className="text-xs text-slate-300">Data 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-400 rounded"></div>
            <span className="text-xs text-slate-300">Data 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="text-xs text-slate-300">Data 3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-400 rounded"></div>
            <span className="text-xs text-slate-300">Data 4</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Section (Product Ranking) - Changed to Table */}
      {barChartData && barChartData.length > 0 ? (
        <div className="bg-slate-700/50 border-t border-slate-600">
          <table className="w-full text-sm">
            <thead className="bg-slate-700">
              <tr className="border-b border-slate-600">
                <th className="px-2 py-1 text-xs text-center text-slate-300 font-medium border-r border-slate-600">품질항목</th>
                <th className="px-2 py-1 text-xs text-center text-slate-300 font-medium border-r border-slate-600">1순위</th>
                <th className="px-2 py-1 text-xs text-center text-slate-300 font-medium border-r border-slate-600">2순위</th>
                <th className="px-2 py-1 text-xs text-center text-slate-300 font-medium border-r border-slate-600">3순위</th>
                <th className="px-2 py-1 text-xs text-center text-slate-300 font-medium">4순위</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-600">
                {barChartData.map((item, idx) => (
                  <td key={idx} className="px-2 py-1 text-center border-r border-slate-600 last:border-r-0">
                    <span className="text-xs text-slate-300">{item.label}</span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-600">
                {barChartData.map((item, idx) => (
                  <td key={idx} className="px-2 py-1 text-center border-r border-slate-600 last:border-r-0">
                    <span className="text-xs text-slate-300">-</span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-700/50 transition-colors border-b border-slate-600">
                {barChartData.map((item, idx) => (
                  <td key={idx} className="px-2 py-1 text-center border-r border-slate-600 last:border-r-0">
                    <span className="text-xs text-slate-300">-</span>
                  </td>
                ))}
              </tr>
              <tr className="hover:bg-slate-700/50 transition-colors">
                {barChartData.map((item, idx) => (
                  <td key={idx} className="px-2 py-1 text-center border-r border-slate-600 last:border-r-0">
                    <span className="text-xs text-slate-300">-</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
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
      )}
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
  barChartData: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired,
    })
  ),
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState(0);
  const [selectedCustomer, setSelectedCustomer] = useState('All');
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);

  const alerts = [
    {
      title: "Alert: System Notification",
      message: "Quality Score threshold exceeded. Immediate action required on EDGE product line."
    },
    {
      title: "Warning: Performance Issue",
      message: "Production line efficiency dropped below 85%. Check equipment status immediately."
    },
    {
      title: "Alert: Material Shortage",
      message: "Raw material inventory critical. Order replenishment required within 24 hours."
    },
    {
      title: "Notice: Maintenance Required",
      message: "Scheduled maintenance for Line 3 equipment due in 48 hours. Prepare backup resources."
    },
    {
      title: "Alert: Quality Deviation",
      message: "Defect rate increased by 15% in the last 4 hours. Investigate production parameters."
    }
  ];

  // Alert rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
    }, 6000); // 5초마다 로테이션

    return () => clearInterval(interval);
  }, [alerts.length]);

  const tabs = [
    { id: 0, name: 'Summary' },
    { id: 1, name: 'GR' },
    { id: 2, name: 'SHP' },
    { id: 3, name: 'POL' },
    { id: 4, name: 'CL' },
    { id: 5, name: 'EPI' },
    { id: 6, name: 'MI' }
  ];

  const cardTabs = [
    { id: 0, name: 'X Parameter' },
    { id: 1, name: 'Y Parameter' }
  ];

  const cardConfigs = [
    {
      id: 1,
      title: "GR",
      info: [
        {
          label: "누적", title1: "OCP Rate", value1: "50%",
          label2: "일", title2: "OCP Rate", value2: "58%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [45, 95, 72, 110] },
        { date: "11-10", values: [58, 108, 88, 128] },
        { date: "11-11", values: [52, 102, 80, 122] },
        { date: "11-12", values: [68, 118, 98, 138] },
        { date: "12-11", values: [75, 125, 105, 145] },
        { date: "13-11", values: [82, 132, 112, 152] },
        { date: "14-11", values: [88, 138, 118, 158] },
        { date: "14-15", values: [92, 142, 122, 162] }
      ],
      barChartData: [
        { label: "OCP Rate", value: 85, color: "bg-slate-500" },
        { label: "Product A", value: 92, color: "bg-red-500" },
        { label: "Product B", value: 67, color: "bg-orange-500" },
        { label: "Product C", value: 43, color: "bg-yellow-500" },
        { label: "Product D", value: 18, color: "bg-blue-500" }
      ],
      tableData: [
        { label: "제품명", value: "STML283T" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 2,
      title: "SHP",
      info: [
        {
          label: "누적", title1: "OCP", value1: "58%",
          label2: "일", title2: "OCP", value2: "58%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [38, 78, 56, 95] },
        { date: "11-10", values: [48, 88, 68, 105] },
        { date: "11-11", values: [42, 82, 62, 100] },
        { date: "11-12", values: [52, 92, 72, 112] },
        { date: "12-11", values: [58, 98, 78, 118] },
        { date: "13-11", values: [64, 104, 84, 124] },
        { date: "14-11", values: [72, 112, 92, 132] },
        { date: "14-15", values: [80, 120, 100, 140] }
      ],
      barChartData: [
        { label: "Defect", value: 76, color: "bg-slate-500" },
        { label: "Unit 1", value: 91, color: "bg-red-500" },
        { label: "Unit 2", value: 73, color: "bg-orange-500" },
        { label: "Unit 3", value: 47, color: "bg-yellow-500" },
        { label: "Unit 4", value: 21, color: "bg-blue-500" }
      ],
      tableData: [
        { label: "제품명", value: "STML283T" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 3,
      title: "POL",
      info: [
        {
          label: "누적", title1: "Quality Score", value1: "92%",
          label2: "일", title2: "Quality Score", value2: "95%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [68, 105, 92, 138] },
        { date: "11-10", values: [73, 115, 102, 147] },
        { date: "11-11", values: [70, 110, 98, 143] },
        { date: "11-12", values: [76, 120, 105, 152] },
        { date: "12-11", values: [82, 128, 112, 160] },
        { date: "13-11", values: [85, 132, 116, 164] },
        { date: "14-11", values: [88, 136, 120, 168] },
        { date: "14-15", values: [91, 140, 124, 172] }
      ],
      barChartData: [
        { label: "Quality", value: 90, color: "bg-slate-500" },
        { label: "Model 1", value: 95, color: "bg-red-500" },
        { label: "Model 2", value: 78, color: "bg-orange-500" },
        { label: "Model 3", value: 52, color: "bg-yellow-500" },
        { label: "Model 4", value: 26, color: "bg-blue-500" }
      ],
      tableData: [
        { label: "제품명", value: "EDGE" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 4,
      title: "CL",
      info: [
        {
          label: "누적", title1: "Yield Rate", value1: "87%",
          label2: "일", title2: "Yield Rate", value2: "90%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [42, 82, 68, 112] },
        { date: "11-10", values: [48, 88, 74, 118] },
        { date: "11-11", values: [45, 85, 71, 115] },
        { date: "11-12", values: [53, 93, 79, 123] },
        { date: "12-11", values: [60, 100, 86, 130] },
        { date: "13-11", values: [65, 105, 91, 135] },
        { date: "14-11", values: [70, 110, 96, 140] },
        { date: "14-15", values: [76, 116, 102, 146] }
      ],
      barChartData: [
        { label: "기준값", value: 89, color: "bg-sky-400" },
        { label: "1순위", value: 92, color: "bg-blue-400" },
        { label: "2순위", value: 86, color: "bg-yellow-400" },
        { label: "3순위", value: 78, color: "bg-orange-400" },
        { label: "4순위", value: 70, color: "bg-green-400" }
      ],
      tableData: [
        { label: "제품명", value: "BULK" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 5,
      title: "EPI",
      info: [
        {
          label: "누적", title1: "Defect Rate", value1: "2.3%",
          label2: "일", title2: "Defect Rate", value2: "1.5%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [28, 68, 48, 88] },
        { date: "11-10", values: [33, 73, 53, 93] },
        { date: "11-11", values: [30, 70, 50, 90] },
        { date: "11-12", values: [36, 76, 56, 96] },
        { date: "12-11", values: [38, 78, 58, 98] },
        { date: "13-11", values: [40, 80, 60, 100] },
        { date: "14-11", values: [42, 82, 62, 102] },
        { date: "14-15", values: [44, 84, 64, 104] }
      ],
      barChartData: [
        { label: "Yield", value: 82, color: "bg-slate-500" },
        { label: "Type A", value: 84, color: "bg-red-500" },
        { label: "Type B", value: 61, color: "bg-orange-500" },
        { label: "Type C", value: 38, color: "bg-yellow-500" },
        { label: "Type D", value: 17, color: "bg-blue-500" }
      ],
      tableData: [
        { label: "제품명", value: "PREMIUM" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    },
    {
      id: 6,
      title: "MI",
      info: [
        {
          label: "누적", title1: "Efficiency", value1: "96.5%",
          label2: "일", title2: "Efficiency", value2: "98%",
          detail1: "건수", detailValue1: "232,345건 / 1,234,534",
          detail2: "건수", detailValue2: "232,345건 / 1,234,534"
        }
      ],
      chartData: [
        { date: "11-09", values: [78, 118, 102, 152] },
        { date: "11-10", values: [83, 123, 108, 158] },
        { date: "11-11", values: [80, 120, 105, 155] },
        { date: "11-12", values: [86, 126, 111, 161] },
        { date: "12-11", values: [89, 129, 114, 164] },
        { date: "13-11", values: [92, 132, 117, 167] },
        { date: "14-11", values: [95, 135, 120, 170] },
        { date: "14-15", values: [98, 138, 123, 173] }
      ],
      barChartData: [
        { label: "Efficiency", value: 93, color: "bg-slate-500" },
        { label: "Batch A", value: 97, color: "bg-red-500" },
        { label: "Batch B", value: 82, color: "bg-orange-500" },
        { label: "Batch C", value: 59, color: "bg-yellow-500" },
        { label: "Batch D", value: 33, color: "bg-blue-500" }
      ],
      tableData: [
        { label: "제품명", value: "STANDARD" },
        { label: "순위", value: "WF7_M_E_APRV_INPUT_CHG" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-900 p-4">
      <div className="mx-auto">
        {/* Header */}
        <div className="mb-4 ml-18">
          <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        </div>

        {/* Tabs */}
        <div className="mb-4 ml-18">
          <div className="flex gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800 shadow-inner">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-md font-medium transition-all ${activeTab === tab.id
                  ? 'bg-slate-700 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-700'
                  }`}
              >
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alarm Area */}

        {/* Tab Content */}
        {activeTab === 0 && (
          <>

            <div className="flex gap-4">
              {/* Card Tabs - Vertical with rotated text */}
              <div className="flex-shrink-0">
                <div className="flex flex-col gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                  {cardTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCardTab(tab.id)}
                      className={`px-3 py-1 rounded-md font-medium transition-all ${activeCardTab === tab.id
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-850'
                        }`}
                    >
                      <span className="writing-mode-vertical-rl transform rotate-180">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                <div className="mb-4 bg-gradient-to-r from-red-950/40 to-orange-950/40 border border-red-700/50 rounded-xl p-4 overflow-hidden relative h-20 flex items-start">
                  <div 
                    className="transition-transform duration-500 ease-in-out w-full"
                    style={{ transform: `translateY(-${currentAlertIndex * 80}px)` }}
                  >
                    {alerts.map((alert, index) => (
                      <div key={index} className="h-20 flex items-start justify-start">
                        <div className="flex-1">
                          <h3 className="text-red-300 font-semibold mb-1">{alert.title}</h3>
                          <p className="text-red-200/80 text-sm">{alert.message}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Card Tab Content */}
                {activeCardTab === 0 && (
                  <>
                    {/* Cards Grid - 2 columns (xl and below), 3 columns (2xl and above) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-4">
                      {cardConfigs.map((config) => (
                        <Card
                          key={config.id}
                          title={config.title}
                          info={config.info}
                          chartData={config.chartData}
                          tableData={config.tableData}
                          barChartData={config.barChartData}
                        />
                      ))}
                    </div>

                    
                  </>
                )}

                {activeCardTab === 1 && (
                  <>
                    <div className="flex flex-row gap-4">
                      {/* Control & Cards Group */}
                      <div className="flex flex-col gap-4 flex-3">
                        {/* Control Group */}
                        <div className="flex">
                          <div className="flex items-center gap-4">
                            <label className="text-sm font-medium text-slate-300 whitespace-nowrap">고객사 선택</label>
                            <select
                              value={selectedCustomer}
                              onChange={(e) => setSelectedCustomer(e.target.value)}
                              className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600 transition-colors"
                            >
                              <option value="All">All</option>
                              <option value="고객사">고객사</option>
                            </select>
                          </div>
                        </div>

                        {/* Trend Cards - 3 columns */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {/* 월 Trend */}
                          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                            <div className="bg-slate-700 px-4 py-2">
                              <h2 className="text-white text-md font-bold">월 Trend</h2>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700">
                              {/* Chart */}
                              <div className="h-48 flex items-end justify-between gap-2">
                                {[
                                  { date: "11-09", values: [45, 95, 72, 110] },
                                  { date: "11-10", values: [58, 108, 88, 128] },
                                  { date: "11-11", values: [52, 102, 80, 122] },
                                  { date: "11-12", values: [68, 118, 98, 138] },
                                  { date: "12-11", values: [75, 125, 105, 145] },
                                  { date: "13-11", values: [82, 132, 112, 152] }
                                ].map((data, idx) => {
                                  const maxTotalValue = Math.max(...[
                                    { date: "11-09", values: [45, 95, 72, 110] },
                                    { date: "11-10", values: [58, 108, 88, 128] },
                                    { date: "11-11", values: [52, 102, 80, 122] },
                                    { date: "11-12", values: [68, 118, 98, 138] },
                                    { date: "12-11", values: [75, 125, 105, 145] },
                                    { date: "13-11", values: [82, 132, 112, 152] }
                                  ].map(d => d.values.reduce((sum, val) => sum + val, 0)));
                                  const colors = ['bg-sky-400', 'bg-blue-400', 'bg-yellow-400', 'bg-orange-400'];
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
                            </div>
                          </div>

                          {/* 주 Trend */}
                          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                            <div className="bg-slate-700 px-4 py-2">
                              <h2 className="text-white text-md font-bold">주 Trend</h2>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700">
                              {/* Chart */}
                              <div className="h-48 flex items-end justify-between gap-2">
                                {[
                                  { date: "11-09", values: [40, 88, 65, 105] },
                                  { date: "11-10", values: [48, 98, 75, 115] },
                                  { date: "11-11", values: [44, 92, 70, 110] },
                                  { date: "11-12", values: [56, 105, 82, 122] },
                                  { date: "12-11", values: [62, 112, 89, 129] },
                                  { date: "13-11", values: [70, 120, 97, 137] }
                                ].map((data, idx) => {
                                  const maxTotalValue = Math.max(...[
                                    { date: "11-09", values: [40, 88, 65, 105] },
                                    { date: "11-10", values: [48, 98, 75, 115] },
                                    { date: "11-11", values: [44, 92, 70, 110] },
                                    { date: "11-12", values: [56, 105, 82, 122] },
                                    { date: "12-11", values: [62, 112, 89, 129] },
                                    { date: "13-11", values: [70, 120, 97, 137] }
                                  ].map(d => d.values.reduce((sum, val) => sum + val, 0)));
                                  const colors = ['bg-sky-400', 'bg-blue-400', 'bg-yellow-400', 'bg-orange-400'];
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
                            </div>
                          </div>

                          {/* 일 Trend */}
                          <div className="bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700">
                            <div className="bg-slate-700 px-4 py-2">
                              <h2 className="text-white text-md font-bold">일 Trend</h2>
                            </div>
                            <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-700">
                              {/* Chart */}
                              <div className="h-48 flex items-end justify-between gap-2">
                                {[
                                  { date: "11-09", values: [35, 78, 58, 98] },
                                  { date: "11-10", values: [42, 85, 65, 105] },
                                  { date: "11-11", values: [38, 82, 62, 102] },
                                  { date: "11-12", values: [48, 95, 75, 115] },
                                  { date: "12-11", values: [54, 102, 82, 122] },
                                  { date: "13-11", values: [60, 110, 90, 130] }
                                ].map((data, idx) => {
                                  const maxTotalValue = Math.max(...[
                                    { date: "11-09", values: [35, 78, 58, 98] },
                                    { date: "11-10", values: [42, 85, 65, 105] },
                                    { date: "11-11", values: [38, 82, 62, 102] },
                                    { date: "11-12", values: [48, 95, 75, 115] },
                                    { date: "12-11", values: [54, 102, 82, 122] },
                                    { date: "13-11", values: [60, 110, 90, 130] }
                                  ].map(d => d.values.reduce((sum, val) => sum + val, 0)));
                                  const colors = ['bg-sky-400', 'bg-blue-400', 'bg-yellow-400', 'bg-orange-400'];
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
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* New Div in Parent Group */}
                      <div className="flex flex-col gap-4">
                        <div className="flex items-center gap-4 justify-end">
                          <label className="text-sm font-medium text-slate-300 whitespace-nowrap">기준</label>
                          <select className="bg-slate-800 text-white border border-slate-700 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-600 transition-colors">
                            <option value="">일자</option>
                            <option value="">상세</option>
                          </select>
                        </div>

                        {/* 통합 범례 */}
                        <div className="flex flex-col gap-3">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-sky-400 rounded"></div>
                            <span className="text-sm text-slate-300">xxxx 9.0% (334건)</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-blue-400 rounded"></div>
                            <span className="text-sm text-slate-300">xxxx 9.0% (334건)</span>
                          </div>
                        </div>
                      </div>



                    </div>
                    {/* Y Parameter Table */}
                    <table className="w-full border-collapse rounded-xl overflow-hidden border border-slate-600 mt-4">
                      <thead>
                        <tr className="bg-slate-700 border-b border-slate-600">
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목1</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목2</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목3</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목4</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목5</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목6</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목7</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목8</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목9</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold border-r border-slate-600">항목10</th>
                          <th className="px-2 py-2 text-slate-300 text-xs font-semibold">항목11</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="bg-slate-800 border-b border-slate-600 hover:bg-slate-700/50">
                          <th className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600" rowSpan="3">데이터</th>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 1</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">100</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 2</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">200</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 3</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">300</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 4</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">400</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 5</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">500</td>
                          <td className="px-2 py-2 text-slate-300 text-xs">데이터 6</td>
                        </tr>
                        <tr className="bg-slate-800 border-b border-slate-600 hover:bg-slate-700/50">
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 7</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">700</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 8</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">800</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 9</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">900</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 10</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1000</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 11</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1100</td>
                          <td className="px-2 py-2 text-slate-300 text-xs">데이터 12</td>
                        </tr>
                        <tr className="bg-slate-800 hover:bg-slate-700/50">
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 13</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1300</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 14</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1400</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 15</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1500</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 16</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1600</td>
                          <td className="px-2 py-2 text-slate-300 text-xs border-r border-slate-600">데이터 17</td>
                          <td className="px-2 py-2 text-slate-200 text-xs border-r border-slate-600">1700</td>
                          <td className="px-2 py-2 text-slate-300 text-xs">데이터 18</td>
                        </tr>
                      </tbody>
                    </table>
                  </>
                )
                }


              </div>
            </div>
          </>
        )}

        {activeTab === 1 && (
          <>

            <div className="flex gap-4">
              {/* Card Tabs - Vertical with rotated text */}
              <div className="flex-shrink-0">
                <div className="flex flex-col gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
                  {cardTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCardTab(tab.id)}
                      className={`px-3 py-1 rounded-md font-medium transition-all ${activeCardTab === tab.id
                        ? 'bg-slate-700 text-white'
                        : 'text-slate-500 hover:text-slate-300 hover:bg-slate-850'
                        }`}
                    >
                      <span className="writing-mode-vertical-rl transform rotate-180">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">

                {/* Card Tab Content */}
                {activeCardTab === 0 && (
                  <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center h-full">
                    <h2 className="text-2xl font-bold text-white mb-2">GR</h2>
                    <p className="text-slate-400">GR X content coming soon...</p>
                  </div>
                )}

                {activeCardTab === 1 && (
                  <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center h-full">
                    <h2 className="text-2xl font-bold text-white mb-2">GR</h2>
                    <p className="text-slate-400">GR Y content coming soon...</p>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 2 && (
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">SHP</h2>
            <p className="text-slate-400">SHP content coming soon...</p>
          </div>
        )}

        {activeTab === 3 && (
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">POL</h2>
            <p className="text-slate-400">POL content coming soon...</p>
          </div>
        )}

        {activeTab === 4 && (
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">CL</h2>
            <p className="text-slate-400">CL content coming soon...</p>
          </div>
        )}

        {activeTab === 5 && (
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">EPI</h2>
            <p className="text-slate-400">EPI content coming soon...</p>
          </div>
        )}

        {activeTab === 6 && (
          <div className="bg-slate-800 rounded-lg p-12 border border-slate-700 text-center">
            <h2 className="text-2xl font-bold text-white mb-2">MI</h2>
            <p className="text-slate-400">MI content coming soon...</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default App;
