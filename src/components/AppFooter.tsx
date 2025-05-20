
export function AppFooter() {
  return (
    <footer className="py-6 border-t bg-card">
      <div className="container mx-auto text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} Artimotion. Tous droits réservés.</p>
        <p className="mt-1">Transformez votre art, une animation à la fois.</p>
      </div>
    </footer>
  );
}
