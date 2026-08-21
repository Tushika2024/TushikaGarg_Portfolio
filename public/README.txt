Put these two files here before deploying:

  tushika.jpg                 square photo, ~600x600
  Tushika-Garg-Resume.pdf     one-page resume

Both are referenced from src/data/content.ts (profile.photo, profile.resume).
The photo falls back to initials if missing. The resume link will 404 if missing.
