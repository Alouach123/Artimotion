export function AppFooter() {
  return (
    <footer className="py-6 text-center text-sm text-muted-foreground border-t mt-auto">
      <div className="container mx-auto">
        <p>&copy; {new Date().getFullYear()} Artimotion. Tous droits réservés.</p>
        <p className="mt-1">Transformez votre art, une animation à la fois.</p>
      </div>
    </footer>
  );
}
