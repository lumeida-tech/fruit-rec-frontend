import { ProfileSettings } from "../components/profile-settings"

export default function ProfilePage() {
  return (
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Paramètres du profil</h1>
          <p className="text-muted-foreground">Gérez votre profil et vos préférences de compte</p>
        </div>
        <ProfileSettings />
      </div>
  )
}