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
