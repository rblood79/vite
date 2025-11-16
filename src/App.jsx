function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl p-8 max-w-md w-full">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">Welcome</h1>
        <p className="text-gray-600 text-center mb-6">
          React App with Tailwind CSS
        </p>
        <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-200">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App;
