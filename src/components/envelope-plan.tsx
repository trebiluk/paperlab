/** Student make for the locking envelope. Copy is the Curriculum Bot step list. */

const FILES = {
  board: "envelope-steps-board.svg",
  note: "01-note-payload.svg",
  sides: "02-side-flaps.svg",
  pocket: "03-bottom-pocket.svg",
  tuck: "04-tuck-lock.svg",
  shake: "05-shake-test.svg",
  bonus: "05-finished-named.svg",
} as const;

function asset(file: string) {
  return `${import.meta.env.BASE_URL}images/plans/envelope/${file}`;
}

function Diagram({
  slot,
  file,
  alt,
}: {
  slot: number;
  file: string;
  alt: string;
}) {
  return (
    <img
      src={asset(file)}
      alt={alt}
      width={800}
      height={620}
      data-diagram={slot}
      data-diagram-file={file}
      className="h-auto w-full rounded-xl bg-[#EEF2F7]"
    />
  );
}

function Step({ n, children }: { n: number; children: React.ReactNode }) {
  return (
    <li className="grid grid-cols-[2.75rem_minmax(0,1fr)] items-start gap-3 text-lg font-medium leading-snug text-ink">
      <span className="flex size-11 items-center justify-center rounded-full bg-pine text-base font-semibold text-pine-fg tabular-nums">
        {n}
      </span>
      <span className="pt-2">{children}</span>
    </li>
  );
}

export function EnvelopeStudentPlan() {
  return (
    <div className="mt-6" data-envelope-plan>
      <img
        src={asset(FILES.board)}
        alt="Overview of five diagrams: note, side flaps, bottom pocket, tuck lock, and the ten-shake test."
        width={1680}
        height={440}
        className="h-auto w-full rounded-xl"
      />

      <section className="mt-8" aria-labelledby="envelope-need">
        <h2 id="envelope-need" className="font-display text-2xl font-semibold text-ink">
          You need
        </h2>
        <ul className="mt-3 list-disc space-y-1 pl-5 text-lg text-ink-soft">
          <li>1 sheet of paper (letter, A4, or class size)</li>
          <li>1 small note (half sheet or note card)</li>
          <li>Pencil</li>
          <li>Scissors only if the teacher says cut</li>
          <li>Glue or tape only if the teacher allows a labeled seal</li>
        </ul>
        <p className="mt-4 text-lg text-ink">
          <span className="font-semibold">Goal. </span>
          Wrap the note. Tuck the top flap into a pocket. Pass a 10-shake test. Write your alias on the front.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="envelope-steps">
        <h2 id="envelope-steps" className="font-display text-2xl font-semibold text-ink">
          Steps
        </h2>
        <p className="mt-2 text-ink-soft">Follow in order. One action each line.</p>

        <figure className="mt-6">
          <Diagram
            slot={1}
            file={FILES.note}
            alt="Diagram 1: a note on a bigger sheet. The sheet sticks out past the note on the left and the right."
          />
          <ol className="mt-4 space-y-3">
            <Step n={1}>Put the note on the desk.</Step>
            <Step n={2}>Put the big sheet under it.</Step>
            <Step n={3}>Check: the big sheet sticks out past the note on the left and the right.</Step>
          </ol>
        </figure>

        <figure className="mt-8">
          <Diagram
            slot={2}
            file={FILES.sides}
            alt="Diagram 2: left and right side flaps fold in over the note."
          />
          <ol className="mt-4 space-y-3">
            <Step n={4}>
              Fold the <strong>left</strong> side over the note.
            </Step>
            <Step n={5}>Press the crease with a fingernail.</Step>
            <Step n={6}>
              Fold the <strong>right</strong> side over the note.
            </Step>
            <Step n={7}>Press the crease hard.</Step>
            <Step n={8}>Check: the sides meet or overlap a little. Not baggy.</Step>
          </ol>
        </figure>

        <figure className="mt-8">
          <Diagram
            slot={3}
            file={FILES.pocket}
            alt="Diagram 3: the bottom folds up into a pocket that covers the bottom of the note."
          />
          <ol className="mt-4 space-y-3">
            <Step n={9}>
              Fold the <strong>bottom</strong> up to make a pocket.
            </Step>
            <Step n={10}>The pocket must cover the bottom of the note.</Step>
            <Step n={11}>Press the crease hard.</Step>
            <Step n={12}>If the pocket is too short, unfold once. Fold higher. Press again.</Step>
          </ol>
        </figure>

        <figure className="mt-8">
          <Diagram
            slot={4}
            file={FILES.tuck}
            alt="Diagram 4: the top flap tucks into the bottom pocket. No tape."
          />
          <ol className="mt-4 space-y-3">
            <Step n={13}>
              Fold the <strong>top</strong> flap down.
            </Step>
            <Step n={14}>
              Tuck the top flap <strong>into</strong> the bottom pocket.
            </Step>
            <Step n={15}>If it will not tuck, the bottom fold was too shallow. Unfold. Redo step 9–12.</Step>
            <Step n={16}>
              Do <strong>not</strong> tape first. Fix the fold.
            </Step>
          </ol>
        </figure>

        <figure className="mt-8">
          <Diagram
            slot={5}
            file={FILES.shake}
            alt="Diagram 5: shake the closed envelope ten times at the same height. Pass if the note stays in. Then write an alias on the front."
          />
          <ol className="mt-4 space-y-3">
            <Step n={17}>Hold the envelope at the same height each time.</Step>
            <Step n={18}>
              Shake <strong>ten</strong> times. Count out loud or on fingers.
            </Step>
            <Step n={19}>
              Pass = note stays in. Fail = open · change <strong>one</strong> fold · test again.
            </Step>
            <Step n={20}>
              Write your <strong>alias</strong> on the front. No legal name.
            </Step>
          </ol>
        </figure>
      </section>

      <section className="mt-10" aria-labelledby="envelope-done">
        <h2 id="envelope-done" className="font-display text-2xl font-semibold text-ink">
          Done when
        </h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-lg text-ink">
          {[
            "Note is inside",
            "Top flap tucks into the pocket",
            "10 shakes · note stays in",
            "Alias on the front",
            "No hidden tape (unless teacher said OK and you labeled it)",
          ].map((item) => (
            <li key={item} className="min-h-11">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10" aria-labelledby="envelope-stuck">
        <h2 id="envelope-stuck" className="font-display text-2xl font-semibold text-ink">
          Stuck? Try this
        </h2>
        <p className="mt-2 text-ink-soft">One change. Stay calm.</p>
        <table className="mt-4 w-full text-left text-base text-ink">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 pr-3 font-semibold">Problem</th>
              <th className="py-2 font-semibold">One change</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Flap will not tuck", "Make the bottom pocket taller"],
              ["Note falls out", "Fold sides tighter · press creases harder"],
              ["Wrap is baggy", "Crease against the note · not far away"],
              ["Paper tears", "Ask for scrap · start that fold again"],
              ["Hands tired", "Pre-crease with a ruler edge · rest · then press"],
            ].map(([problem, change]) => (
              <tr key={problem} className="border-b border-line/70 align-top">
                <th scope="row" className="py-3 pr-3 font-medium">
                  {problem}
                </th>
                <td className="py-3">{change}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-lg text-ink">
          <span className="font-semibold">Help path. </span>
          Try the table → ask a peer → ask Mr. K.
        </p>
        <p className="mt-2 text-lg text-ink">
          <span className="font-semibold">Pause. </span>
          Put paper down · breathe · come back to the same step number.
        </p>
      </section>

      <section className="mt-10" aria-labelledby="envelope-words">
        <h2 id="envelope-words" className="font-display text-2xl font-semibold text-ink">
          Words
        </h2>
        <p className="mt-2 text-ink-soft">Say once.</p>
        <table className="mt-4 w-full text-left text-base text-ink">
          <thead>
            <tr className="border-b border-line">
              <th className="py-2 pr-3 font-semibold">Word</th>
              <th className="py-2 pr-3 font-semibold">Means</th>
              <th className="py-2 font-semibold">Spanish cognate</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Package", "Wrap that holds and protects", "paquete"],
              ["Seal", "Lock that keeps it closed", "sello"],
              ["Tuck", "Flap slid into a pocket", "meter"],
              ["Crease", "Sharp fold line you press", "pliegue"],
              ["Payload", "The note inside", "—"],
            ].map(([word, means, es]) => (
              <tr key={word} className="border-b border-line/70 align-top">
                <th scope="row" className="py-3 pr-3 font-semibold">
                  {word}
                </th>
                <td className="py-3 pr-3">{means}</td>
                <td className="py-3" lang={es === "—" ? undefined : "es"}>
                  {es}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-4 text-ink-soft">
          Home languages in class may include Spanish, Chinese, Arabic, Bengali, Haitian Creole, and more.
          Diagrams and these short lines are the access tools. A bilingual peer or para can read a step aloud.
        </p>
      </section>

      <figure className="mt-10">
        <figcaption className="text-sm font-medium text-muted">
          Bonus look. Not a step. Diagram 5 is the shake test above.
        </figcaption>
        <img
          src={asset(FILES.bonus)}
          alt="Bonus: a finished envelope with an alias on the front. This picture is not diagram 5."
          width={800}
          height={620}
          data-diagram="bonus"
          data-diagram-file={FILES.bonus}
          className="mt-2 h-auto w-full rounded-xl bg-[#EEF2F7]"
        />
      </figure>
    </div>
  );
}
