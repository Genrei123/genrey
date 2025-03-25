export default function About() {
    return (
        <>


            <div className="hero min-h-screen bg-[#0d1b2a]">
                <div className="hero-overlay"></div>
                <div className="hero-content text-neutral-content text-center">
                    <div className="max-w-md">
                        <div className="avatar hover:scale-130 p-8 ">
                            <div className="w-full rounded-full border-2">
                                <img src="./icon.png" />
                            </div>
                        </div>
                        <h1 className="mb-5 text-5xl font-bold">Hi! I'm Genrey!</h1>
                        <p className="mb-5">
                            Building solutions one business at a time. One problem at a time. Impacting many at a time
                        </p>
                        <button className="btn btn-primary">Contact me!</button>
                    </div>
                </div>
            </div>
        </>
    );
}
