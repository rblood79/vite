import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// Card Component
function Card({ title, info, chartData, tableData, barChartData, isDarkMode }) {
  const isDark = isDarkMode;
  const theme = {
    card: isDark ? 'bg-slate-800' : 'bg-white',
    cardBorder: isDark ? 'border-slate-700' : 'border-gray-300',
    header: isDark ? 'bg-slate-700' : 'bg-gray-200',
    text: isDark ? 'text-white' : 'text-gray-900',
    textSecondary: isDark ? 'text-slate-300' : 'text-gray-700',
    textTertiary: isDark ? 'text-slate-500' : 'text-gray-600',
    textHighlight: isDark ? 'text-blue-300' : 'text-blue-600',
    chartBg: isDark ? 'bg-slate-700' : 'bg-gray-200',
    chartGradient: isDark ? 'from-slate-800 to-slate-700' : 'from-gray-50 to-gray-100',
    tableBg: isDark ? 'bg-slate-700' : 'bg-gray-200',
    tableHover: isDark ? 'hover:bg-slate-700' : 'hover:bg-gray-200',
  };

  return (
    <div className={`${theme.card} rounded-xl overflow-hidden shadow-lg border ${theme.cardBorder} hover:shadow-xl transition-shadow`}>
      {/* Card Title */}
      <div className={`${theme.header} px-4 py-1`}>
        <h2 className={`${theme.text} text-md font-bold`}>{title}</h2>
      </div>

      {/* Info Section - 6 columns x 2 rows */}
      <div className={`${theme.card} border-b ${theme.cardBorder} px-4 py-1`}>
        {info.map((item, idx) => (
          <div key={idx}>
            {/* Row 1 */}
            <div className="flex items-center gap-1 mb-2 text-xs">
              <span className={`${theme.textSecondary} font-medium w-8`}>{item.label}</span>
              <span className={`${theme.text} w-16 truncate`}>{item.title1}</span>
              <span className={`${theme.textHighlight} font-medium flex-1 text-center`}>{item.value1}</span>
              <span className={`${theme.textSecondary} font-medium w-8`}>{item.label2}</span>
              <span className={`${theme.text} w-16 truncate`}>{item.title2}</span>
              <span className={`${theme.textHighlight} font-medium flex-1 text-center`}>{item.value2}</span>
            </div>
            {/* Row 2 */}
            <div className="flex items-center gap-1 text-xs">
              <span className={`${theme.textTertiary} w-8`}>기준</span>
              <span className={`${theme.textSecondary} w-16 truncate`}>{item.detail1}</span>
              <span className={`${theme.text} flex-1 text-center`}>{item.detailValue1}</span>
              <span className={`${theme.textTertiary} w-8`}>기준</span>
              <span className={`${theme.textSecondary} w-16 truncate`}>{item.detail2}</span>
              <span className={`${theme.text} flex-1 text-center`}>{item.detailValue2}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Chart Section */}
      <div className={`px-4 py-3 flex items-center justify-between gap-4 bg-gradient-to-br ${theme.chartGradient}`}>
        {/* Chart */}
        <div className="flex-1 h-32 flex items-end justify-between gap-2">
          {chartData.map((data, idx) => {
            const maxTotalValue = Math.max(...chartData.map(d => d.values.reduce((sum, val) => sum + val, 0)));
            const colors = [
              'bg-sky-500',
              'bg-blue-500',
              'bg-yellow-500',
              'bg-orange-500',
              'bg-green-500',
            ];
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative h-20 flex items-end">
                  <div className={`w-full h-full ${theme.chartBg} rounded-t flex flex-col justify-end overflow-hidden`}>
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
                <span className={`text-xs ${theme.textSecondary} text-center`}>{data.date}</span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`flex flex-col gap-2 min-w-max pl-4 border-l ${theme.cardBorder}`}>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-sky-500 rounded"></div>
            <span className={`text-xs ${theme.text}`}>Data 1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className={`text-xs ${theme.text}`}>Data 2</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span className={`text-xs ${theme.text}`}>Data 3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-orange-500 rounded"></div>
            <span className={`text-xs ${theme.text}`}>Data 4</span>
          </div>
        </div>
      </div>

      {/* Bar Chart Section (Product Ranking) - Changed to Table */}
      {barChartData && barChartData.length > 0 ? (
        <div className={isDark ? 'bg-slate-800' : 'bg-gray-100 border-t border-gray-300'}>
          <table className="w-full text-sm">
            <thead className={theme.header}>
              <tr className={`border-b ${theme.cardBorder}`}>
                <th className={`px-2 py-1 text-xs text-center ${theme.text} font-medium border-r ${theme.cardBorder}`}>품질항목</th>
                <th className={`px-2 py-1 text-xs text-center ${theme.text} font-medium border-r ${theme.cardBorder}`}>1순위</th>
                <th className={`px-2 py-1 text-xs text-center ${theme.text} font-medium border-r ${theme.cardBorder}`}>2순위</th>
                <th className={`px-2 py-1 text-xs text-center ${theme.text} font-medium border-r ${theme.cardBorder}`}>3순위</th>
                <th className={`px-2 py-1 text-xs text-center ${theme.text} font-medium`}>4순위</th>
              </tr>
            </thead>
            <tbody>
              <tr className={`${theme.tableHover} transition-colors border-b ${theme.cardBorder}`}>
                {barChartData.map((item, idx) => (
                  <td key={idx} className={`px-2 py-1 text-center border-r ${theme.cardBorder} last:border-r-0`}>
                    <span className={`text-xs ${theme.text}`}>{item.label}</span>
                  </td>
                ))}
              </tr>
              <tr className={`${theme.tableHover} transition-colors border-b ${theme.cardBorder}`}>
                {barChartData.map((item, idx) => (
                  <td key={idx} className={`px-2 py-1 text-center border-r ${theme.cardBorder} last:border-r-0`}>
                    <span className={`text-xs ${theme.text}`}>{['A사', 'B사', 'C사', 'D사', 'E사'][idx]}</span>
                  </td>
                ))}
              </tr>
              <tr className={`${theme.tableHover} transition-colors`}>
                {barChartData.map((item, idx) => (
                  <td key={idx} className={`px-2 py-1 text-center border-r ${theme.cardBorder} last:border-r-0`}>
                    <span className={`text-xs ${theme.text}`}>{['제품1', '제품2', '제품3', '제품4', '제품5'][idx]}</span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      ) : (
        <div className={isDark ? 'bg-slate-700' : 'bg-gray-200 border-t border-gray-300'}>
          <table className="w-full text-sm">
            <tbody>
              {tableData.map((row, idx) => (
                <tr key={idx} className={`border-b ${theme.cardBorder} last:border-b-0 ${theme.tableHover} transition-colors`}>
                  <td className={`px-4 py-3 ${theme.text} font-medium w-20`}>{row.label}</td>
                  <td className={`px-4 py-3 ${theme.text}`}>{row.value}</td>
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
  isDarkMode: PropTypes.bool.isRequired,
};

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeCardTab, setActiveCardTab] = useState(0);
  const [currentAlertIndex, setCurrentAlertIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false); // 테마 상태

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

  // 테마별 스타일
  const theme = {
    bgGradient: isDarkMode ? 'from-slate-900 via-slate-800 to-slate-700' : 'from-white via-gray-50 to-gray-100',
    tabBg: isDarkMode ? 'bg-slate-700' : 'bg-gray-200',
    tabBorder: isDarkMode ? 'border-slate-700' : 'border-gray-300',
    tabTextActive: isDarkMode ? 'bg-slate-600 text-white' : 'bg-gray-600 text-white',
    tabTextInactive: isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-600' : 'text-gray-700 hover:text-white hover:bg-gray-600',
    headerText: isDarkMode ? 'text-white' : 'text-slate-900',
    alarmBg: isDarkMode ? 'from-red-950/40 to-orange-950/40' : 'from-slate-300/40 to-slate-400/40',
    alarmBorder: isDarkMode ? 'border-red-700/50' : 'border-slate-500/50',
    alarmTitle: isDarkMode ? 'text-red-300' : 'text-slate-900',
    alarmText: isDarkMode ? 'text-red-200/80' : 'text-slate-700/80',
    cardTabBg: isDarkMode ? 'bg-slate-700' : 'bg-gray-200',
    cardTabBorder: isDarkMode ? 'border-slate-700' : 'border-gray-300',
    selectBg: isDarkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-gray-50 text-gray-900 border-gray-300',
  };

  // Alert rotation effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAlertIndex((prev) => (prev + 1) % alerts.length);
    }, 6000);

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
        { label: "기준값", value: 89, color: "bg-sky-500" },
        { label: "1순위", value: 92, color: "bg-blue-500" },
        { label: "2순위", value: 86, color: "bg-yellow-500" },
        { label: "3순위", value: 78, color: "bg-orange-500" },
        { label: "4순위", value: 70, color: "bg-green-500" }
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
    <div className={`min-h-screen bg-gradient-to-br ${theme.bgGradient} p-4`}>
      <div className="mx-auto">
        {/* Header with Theme Toggle */}
        <div className="mb-1 ml-18 flex justify-between items-center">
          <h1 className={`text-2xl font-bold ${theme.headerText} mb-1`}>Dashboard</h1>
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`px-4 py-1 rounded-lg font-small transition-all ${
              isDarkMode 
                ? 'bg-yellow-500 text-slate-900 hover:bg-yellow-400' 
                : 'bg-gray-800 text-white hover:bg-gray-700'
            }`}
          >
            {isDarkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-2 ml-18">
          <div className={`flex gap-2 ${theme.tabBg} p-1.5 rounded-lg border ${theme.tabBorder} shadow-inner`} style={{boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-3 rounded-md font-medium transition-all ${activeTab === tab.id
                  ? theme.tabTextActive
                  : theme.tabTextInactive
                  }`}
              >
                <span>{tab.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Alarm Area */}
        {activeTab === 0 || activeTab === 1 ? (
          <div className={`mb-4 ml-18 bg-gradient-to-r ${theme.alarmBg} border ${theme.alarmBorder} rounded-xl p-4 overflow-hidden relative h-20 flex items-start`}>
            <div 
              className="transition-transform duration-500 ease-in-out w-full"
              style={{ transform: `translateY(-${currentAlertIndex * 80}px)` }}
            >
              {alerts.map((alert, index) => (
                <div key={index} className="h-20 flex items-start justify-start">
                  <div className="flex-1">
                    <h3 className={`${theme.alarmTitle} font-semibold mb-1`}>{alert.title}</h3>
                    <p className={`${theme.alarmText} text-sm`}>{alert.message}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : null}

        {/* Tab Content - Summary */}
        {activeTab === 0 && (
          <>
            <div className="flex gap-4 ml-18">
              {/* Card Tabs - Vertical with rotated text */}
              <div className="flex-shrink-0">
                <div className={`flex flex-col gap-2 ${theme.cardTabBg} p-1.5 rounded-lg border ${theme.cardTabBorder} shadow-inner`} style={{boxShadow: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)'}}>
                  {cardTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveCardTab(tab.id)}
                      className={`px-3 py-1 rounded-md font-medium transition-all ${activeCardTab === tab.id
                        ? isDarkMode ? 'bg-slate-600 text-white' : 'bg-gray-600 text-white'
                        : isDarkMode ? 'text-slate-300 hover:text-white hover:bg-slate-600' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-500'
                        }`}
                    >
                      <span className="writing-mode-vertical-rl transform rotate-180">{tab.name}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex-1">
                {activeCardTab === 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-3 gap-4">
                    {cardConfigs.map((config) => (
                      <Card
                        key={config.id}
                        title={config.title}
                        info={config.info}
                        chartData={config.chartData}
                        tableData={config.tableData}
                        barChartData={config.barChartData}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* Tab Content - GR (Placeholder for now) */}
        {activeTab === 1 && (
          <div className={`ml-18 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-12 border ${isDarkMode ? 'border-slate-700' : 'border-gray-300'} text-center`}>
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>GR</h2>
            <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>GR content coming soon...</p>
          </div>
        )}

        {/* Other Tabs */}
        {[2, 3, 4, 5, 6].map((tabId) => (
          activeTab === tabId && (
            <div key={tabId} className={`ml-18 ${isDarkMode ? 'bg-slate-800' : 'bg-white'} rounded-lg p-12 border ${isDarkMode ? 'border-slate-700' : 'border-gray-300'} text-center`}>
              <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'} mb-2`}>{tabs[tabId].name}</h2>
              <p className={isDarkMode ? 'text-slate-400' : 'text-gray-600'}>{tabs[tabId].name} content coming soon...</p>
            </div>
          )
        ))}
      </div>
    </div>
  )
}

export default App;
