# Reimbursement System Dev Log

Feb 24, 2026
Encountered annoying bug with getting the reimbursement table to display or update when page is refreshed or submit button was clicked.
Apparently, Angular's default handler, Zone.js can miss ticks during async operations. Manually triggering ChangeDetectorRef solved the issue so I will need to keep that in mind.
The majority of my time spent debugging thus far (on this and prior projects) feels as if, even if not factually, 
to have been tracking down the source of runtime errors boiling down to finding a way to manually force a refresh/update to the UI.
Alternatively, these errors end up being caused by a typo in a variable type or an error in a path - often due to (improperly executed on my part) refactoring when moving something into a subfolder/subpackage.
Another interesting note, I was unaware of (or had forgotten) Spring annotations supported relationality indicators such as @ManyToOne which is a really cool feature.
I supposse I had forgotten that SQL can enforce and allow you to implement referential integrity aspects. 
My past experience with SQL only touched on the surface level aspects of SQL i.e. query syntax with only brief mentions of the deeper functionality and database engineering aspects.
Another note/annoyance, Typescript and Angular seem to be moving towards less boilerplate syntax so hopefully there will be a future where we do not have to declare angular imports twice.

Feb 27, 2026

I wish Visual Studio Code had a refactor button like IntelliJ Idea does for renaming classes instead of manually having to check everywhere it's referenced. I imagine there might be a plugin for this feature but plugins are an entire rabbit hole I am avoiding for the time being.
