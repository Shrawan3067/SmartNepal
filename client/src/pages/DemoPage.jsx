const DemoPage = () => {
  return (
    <div className="text-center py-12">
      <h1 className="text-3xl font-bold mb-4">Demo Page</h1>
      <p className="text-gray-600 mb-8">
        This is a demo page for testing purposes.
      </p>
      <div className="max-w-2xl mx-auto bg-gray-50 p-8 rounded-lg">
        <h2 className="text-xl font-bold mb-4">Features Demo</h2>
        <ul className="text-left space-y-2">
          <li>✓ User authentication system</li>
          <li>✓ Bus search and booking</li>
          <li>✓ Seat selection interface</li>
          <li>✓ Multiple payment methods</li>
          <li>✓ Booking confirmation</li>
          <li>✓ Hotel listings</li>
        </ul>
      </div>
    </div>
  )
}

export default DemoPage