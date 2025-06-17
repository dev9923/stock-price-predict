# Navigate to the project root before running this script
# Example: cd 'C:\Path\To\Your\Project'

Write-Host "🔍 Fixing unused React imports and unused parameters..."

# Remove unused 'React' imports
Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    (Get-Content $_.FullName) | 
    Where-Object { $_ -notmatch '^\s*import\s+React\s+from\s+[\'"]react[\'"];?\s*$' } |
    Set-Content $_.FullName
}

# Remove other unused named imports like ArrowRight, Play, etc.
$unusedImports = @(
    "Phone", "TrendingUp", "ArrowRight", "Play", "Lock", "axios", "API_BASE_URL"
)

Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName
    $newContent = $content

    foreach ($import in $unusedImports) {
        $pattern = "\b$import\b"
        $newContent = $newContent -replace "(\s*,?\s*$pattern\s*,?\s*)", ""
    }

    # Remove empty import blocks
    $newContent = $newContent -replace 'import\s*{\s*}\s*from\s*[\'"][^\'"]+[\'"];?', ''

    # Save updated file
    $newContent | Set-Content $_.FullName
}

# Replace unused function parameters named 'index', 'symbol', or 'period' with '_'
$unusedParams = @("index", "symbol", "period")

Get-ChildItem -Recurse -Include *.ts,*.tsx | ForEach-Object {
    $content = Get-Content $_.FullName
    $newContent = $content

    foreach ($param in $unusedParams) {
        $newContent = $newContent -replace "\b$param\b", "_"
    }

    $newContent | Set-Content $_.FullName
}

# Ensure vite-env.d.ts exists
$viteEnvPath = Join-Path -Path (Get-Location) -ChildPath "vite-env.d.ts"
if (-not (Test-Path $viteEnvPath)) {
    '/// <reference types="vite/client" />' | Set-Content $viteEnvPath
    Write-Host "✅ Created vite-env.d.ts"
} else {
    Write-Host "✅ vite-env.d.ts already exists"
}

Write-Host "`n✅ All fixes applied. Run 'npm run build' to verify the build succeeds."
