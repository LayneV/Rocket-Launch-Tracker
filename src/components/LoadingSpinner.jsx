const LoadingSpinner = () => {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full">
      <p className="dark:text-white text-2xl font-semibold mb-4">
        Igniting Engines...
      </p>
      <img
        src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbzF5YjViYXZuMjB4ZTFseGFid294bzg3amVyeGpnaHh1dzd4MTAxcCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/5G1VDKTWdvuVFa3TaM/giphy.gif"
        alt="Rocket launching animation"
        className="w-48 h-48"
      />
    </div>
  );
};

export default LoadingSpinner;
