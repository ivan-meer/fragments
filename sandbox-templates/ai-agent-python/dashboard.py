from rich.console import Console
from rich.layout import Layout
from rich.panel import Panel
from rich.table import Table
from rich.live import Live
from rich.text import Text
from typing import Dict, Any
import time
from datetime import datetime


class AgentDashboard:
    """Интерактивный дашборд для мониторинга работы ИИ-агента"""
    
    def __init__(self):
        self.console = Console()
        self.layout = Layout()
        self.stats = {
            "total_requests": 0,
            "successful": 0,
            "errors": 0,
            "avg_response_time": 0,
            "last_request": None
        }
        
        # Настройка layout
        self.layout.split(
            Layout(name="header", size=3),
            Layout(name="main", ratio=1),
            Layout(name="footer", size=7)
        )
        
        self.layout["main"].split_row(
            Layout(name="requests", ratio=2),
            Layout(name="logs", ratio=3)
        )
        
    def update_stats(self, success: bool, exec_time: float):
        """Обновление статистики"""
        self.stats["total_requests"] += 1
        if success:
            self.stats["successful"] += 1
        else:
            self.stats["errors"] += 1
            
        # Обновляем среднее время выполнения
        prev_avg = self.stats["avg_response_time"]
        new_count = self.stats["successful"] + self.stats["errors"]
        self.stats["avg_response_time"] = (
            (prev_avg * (new_count - 1) + exec_time) / new_count
        )
        
        self.stats["last_request"] = datetime.now().strftime("%H:%M:%S")
    
    def generate_layout(self) -> Layout:
        """Генерация обновленного layout"""
        # Header
        title = Text("🤖 ИИ-Агент Дашборд", style="bold blue")
        self.layout["header"].update(
            Panel(title, subtitle="Мониторинг в реальном времени")
        )
        
        # Requests panel
        requests_table = Table(title="Статистика запросов")
        requests_table.add_column("Метрика")
        requests_table.add_column("Значение", justify="right")
        
        requests_table.add_row("Всего запросов", str(self.stats["total_requests"]))
        requests_table.add_row("Успешных", f"[green]{self.stats['successful']}[/green]")
        requests_table.add_row("Ошибок", f"[red]{self.stats['errors']}[/red]")
        requests_table.add_row("Среднее время", f"{self.stats['avg_response_time']:.2f} сек")
        requests_table.add_row("Последний запрос", self.stats["last_request"] or "N/A")
        
        self.layout["requests"].update(Panel(requests_table))
        
        # Logs panel
        logs = Text("\n".join([
            f"[{datetime.now().strftime('%H:%M:%S')}] Пример лога 1",
            f"[{datetime.now().strftime('%H:%M:%S')}] Пример лога 2",
            f"[{datetime.now().strftime('%H:%M:%S')}] Пример лога 3"
        ]))
        
        self.layout["logs"].update(Panel(logs, title="Последние логи"))
        
        # Footer
        footer_text = Text("🔄 Обновляется в реальном времени | Ctrl+C для выхода")
        self.layout["footer"].update(Panel(footer_text))
        
        return self.layout
    
    def start(self):
        """Запуск интерактивного дашборда"""
        with Live(self.layout, refresh_per_second=4) as live:
            try:
                while True:
                    live.update(self.generate_layout())
                    time.sleep(0.25)
            except KeyboardInterrupt:
                self.console.print("[yellow]Дашборд остановлен[/yellow]")


if __name__ == "__main__":
    dashboard = AgentDashboard()
    dashboard.start()