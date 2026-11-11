<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## HAOUSSA architecture
- Keep domain rules framework-independent in src/domain and all demo mutations in src/services/store.ts, so a real API can replace the demo without rewriting views.
- Feature views live under src/features and are mounted by individually titled TanStack leaf routes; the root owns the shared public/member/admin shell.
- This phase is a frontend demonstration only: local browser persistence is not authentication or production security, and official texts must remain provisional.
- All public statistical displays and exports must use suppression helpers before rendering; scope filters apply before aggregation in staff views.
- Observatory regional personas are fictional and computed only from region aggregates in src/domain/persona.ts (null below the suppression threshold); never derive them from an individual dossier — privacy.
- Real 3D (three/R3F) is lazy-loaded behind ClientOnly with a CSS depth fallback for phones, reduced motion and weak devices — keeps SSR and mobile light.
- Region photos are real Commons images with credits in src/data/region-media.ts; retouching may grade/crop but never add content — the client forbids invented scenery.
- Before any change, review folder-docs/sentinel.md (protected validated features) and update the five folder-docs files on each delivery — prevents regressions of approved work.
- The Heritage space uses a scoped dark theme (.theme-heritage, heritage-* tokens) and modular content in src/data/heritage-chapters.ts; no global dark-mode toggle — keeps the institutional site light.
- The immersive map is the Observatory's single regional instrument; other sections follow its selection via onRegionChange instead of duplicating regional views.
