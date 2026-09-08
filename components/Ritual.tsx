const STEPS = [
  {
    n: "01",
    title: "Splash",
    body: "Rinse your face with cool water and leave it damp. Tie your hair back so the hairline gets washed too — that's where tan hides.",
  },
  {
    n: "02",
    title: "Work it in",
    body: "A coin-sized drop into wet palms. Lather lightly and move in small upward circles for thirty seconds — cheeks, nose, forehead, jaw, neck.",
  },
  {
    n: "03",
    title: "Rinse & pat",
    body: "Rinse until the water runs clear and pat dry — never rub. Follow with your moisturiser, and sunscreen if it's the morning wash.",
  },
];

export function Ritual() {
  return (
    <>
      <hr className="border-0 border-t border-edgesoft" />
      <section id="ritual" className="py-[74px]">
        <div className="mx-auto max-w-[1120px] px-[22px]">
          <div className="mb-10 flex max-w-[60ch] flex-col gap-[14px]">
            <span className="eyebrow text-rose">How to use</span>
            <h2 className="font-display text-[clamp(2rem,4.2vw,2.9rem)] font-semibold tracking-[-0.012em]">
              Two minutes, morning and night.
            </h2>
            <p className="max-w-[58ch] text-tx2">
              The order matters more than the effort. Cool water throughout — hot
              water undoes half the work.
            </p>
          </div>

          <ol className="grid grid-cols-1 gap-[34px] md:grid-cols-3">
            {STEPS.map((s) => (
              <li
                key={s.n}
                className="flex flex-col gap-3 border-t-2 border-leaf pt-[22px]"
              >
                <span className="font-display text-[2.4rem] font-medium leading-none text-leaf">
                  {s.n}
                </span>
                <h3 className="font-display text-[1.2rem] font-semibold">
                  {s.title}
                </h3>
                <p className="text-[0.95rem] text-tx2">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}
