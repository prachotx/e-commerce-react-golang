function Wrapper({ children }: any) {
  return (
    <div className="max-w-[1200px] mx-auto">
        {children}
    </div>
  )
}

export default Wrapper