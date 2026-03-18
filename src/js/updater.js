import { check } from "@tauri-apps/plugin-updater";
import { getVersion } from "@tauri-apps/api/app";

export async function initUpdater() {
  const version = await getVersion();

  const versionEl = document.createElement("div");
  versionEl.id = "appVersion";
  versionEl.style.position = "absolute";
  versionEl.style.bottom = "10px";
  versionEl.style.right = "15px";
  versionEl.style.opacity = "0.6";
  versionEl.style.fontSize = "12px";
  versionEl.innerText = "v" + version;

  document.body.appendChild(versionEl);

  const update = await check();

  if (update) {
    alert(
      `Nova versão ${update.version} disponível.\nA atualização será instalada.`,
    );

    await update.downloadAndInstall();

    alert("Atualização instalada. O aplicativo será reiniciado.");

    window.location.reload();
  }
}
