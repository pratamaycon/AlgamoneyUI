import { DashboardService } from './../services/dashboard.service';
import { Component, OnInit } from '@angular/core';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public pieChartData: any;
  public lineChartData: any;
  public options: any;

  constructor(
    private decimalPipe: DecimalPipe,
    private dashoardService: DashboardService
    ) { }

  ngOnInit(): void {

    this.options = {
      tooltips: {
        callbacks: {
          label: (tooltipItem, data) => {
            const dataset = data.datasets[tooltipItem.datasetIndex];
            const valor = dataset.data[tooltipItem.index];
            const label = dataset.label ? (dataset.set + ': ') : '';

            return label + this.decimalPipe.transform(valor , '1.2-2');
          }
        }
      }
    }

    this.configurarGraficoPizza();
    this.configurarGraficoLinha();
  }

  configurarGraficoPizza() {
    this.dashoardService.lancamentosPorCategoria()
      .subscribe((dados: any) => {
        this.pieChartData =  {
          labels: dados.map(dado => dado.categoria.nome),
          datasets: [
            {
              data: dados.map( dado => dado.total ),
              backgroundColor: ['#FF9000', '#109618', '#990899', '#383EAC', '#0099C6',
                                 '#DD4477', '#3366CC', '#DC3912']
            }
          ]
        };
      })
  }

  configurarGraficoLinha() {
    this.dashoardService.lancamentosPorDia()
      .subscribe((dados: any) => {
        const diaDoMes = this.configurarDiaMes();
        const totaisReceitas = this.totaisPorDiaCadaMes(
          dados.filter(dado => dado.tipo === 'RECEITA'), diaDoMes);
        const totaisDespesas = this.totaisPorDiaCadaMes(
          dados.filter(dado => dado.tipo === 'DESPESA'), diaDoMes);
        this.lineChartData = {
          labels: diaDoMes,
          datasets: [
            {
              label: 'Receitas',
              data: totaisReceitas,
              borderColor: '#336BCC'
            }, {
              label: 'Despesas',
              data: totaisDespesas,
              borderColor: '#D62B00'
            }
          ]
        }
      })
  }

  private totaisPorDiaCadaMes(dados, diaDoMes) {
    const totais: number[] = [];
    for (const dia of diaDoMes) {
      let total = 0;

      for (const dado of dados) {
        if (dado.dia.getDate() === dia) {
          total = dado.total;

          break;
        }
      }

      totais.push(total);
    }

    return totais;
  }

  private configurarDiaMes() {
    const mesReferencia = new Date();
    mesReferencia.setMonth(mesReferencia.getMonth() + 1);
    mesReferencia.setDate(0);

    const quantidade = mesReferencia.getDate();

    const dias: number[] = [];

    for (let i = 1; i <= quantidade; i++) {
      dias.push(i);
    }

    return dias;
  }

}
