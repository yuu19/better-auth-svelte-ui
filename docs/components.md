Better Auth UIライブラリは、認証とユーザー管理機能を提供するReactコンポーネント群です。コンポーネントは5つのドメインに整理されています 

コンポーネントドメイン一覧
1. 認証ドメイン
ユーザーのサインイン、サインアップ、認証フローを処理します auth-form.tsx:52-68 。

AuthView: 認証UIのメインコンテナ。カードレイアウト、ソーシャルプロバイダー、パスキーなどを表示
AuthForm: 動的ビュールーター。現在のパスと有効な機能に基づいて適切な認証フォームをレンダリング
認証フォーム: SignInForm, SignUpForm, ForgotPasswordForm, ResetPasswordForm, MagicLinkForm, EmailOTPForm, TwoFactorForm, RecoverAccountForm
2. アカウント管理ドメイン
ユーザープロファイルと設定の管理を提供します settings-cards.mdx:5-26 。

AccountView: アカウント管理UIのコンテナ
AccountSettingsCards: アバター、名前、ユーザー名、メールなどの基本設定
SecuritySettingsCards: パスワード変更、メール変更、2要素認証、セッション管理
ApiKeysCard: APIキーの作成、表示、削除
3. 組織ドメイン
マルチテナント組織機能を有効にします organization-view.tsx:188-217 。

OrganizationView: 組織管理UIのコンテナ
OrganizationSwitcher: 組織間の切り替えドロップダウン
OrganizationSettingsCards: 組織名、スラッグ、ロゴの管理
OrganizationMembersCard: メンバーの招待と管理
TeamsCard: チーム管理（オプション機能）
4. ユーザーインターフェースドメイン
ユーザー情報の表示とナビゲーション要素を提供します meta.json:6-13 。

UserButton: ユーザーアクション用のドロップダウンメニュー
UserView: ユーザープロファイル情報の表示
UserAvatar: ユーザーアバター（Gravatar、イニシャルフォールバック対応）
5. バックエンド統合レイヤー
データフェッチングと状態管理の抽象化を提供します meta.json:14-31 。

AuthUIProvider: デフォルトアダプター
TanStack Adapter: TanStack Query統合（SSR、楽観的更新）
InstantDB Adapter: InstantDB統合（リアルタイム同期）
Triplit Adapter: Triplit統合（ローカルファースト）
補助コンポーネント
設定カード個別コンポーネント
各設定項目を個別に使用可能 meta.json:18-31 ：

ChangeEmailCard, ChangePasswordCard, DeleteAccountCard
UpdateNameCard, UpdateUsernameCard, UpdateAvatarCard, UpdateFieldCard
ProvidersCard, SessionsCard, TwoFactorCard, PasskeysCard, AccountsCard
リダイレクトと条件付きコンポーネント
RedirectToSignIn, RedirectToSignUp
AuthLoading, SignedIn, SignedOut
キャプチャ
Google reCAPTCHA、Cloudflare Turnstile、hCaptcha、CaptchaFoxをサポート captcha.tsx:26-36 。

すべてのコンポーネントはAuthUIProviderコンテキストを消費し、一貫したスタイリングとローカライゼーションをサポートしています settings-cards.mdx:48-71 。

Notes
コンポーネントの完全な一覧はsrc/index.tsで確認できます。各コンポーネントはclassNamesプロップでスタイルカスタマイズ、localizationプロップでテキストのローカライズが可能です。組織とチーム機能はオプションで、AuthUIProviderで有効化する必要があります。