<!DOCTYPE html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <title>Material Request</title>

    <style>
        body {
            font-family: Arial, Helvetica, sans-serif;
            margin: 30px;
            color: #000;
            font-size: 13px;
        }

        .header {
            text-align: center;
            margin-bottom: 25px;
        }

        .header h1 {
            margin: 0;
            font-size: 24px;
            letter-spacing: 2px;
        }

        .header h2 {
            margin: 8px 0 4px;
            font-size: 18px;
        }

        .header p {
            margin: 0;
            font-size: 12px;
            color: #444;
        }

        .info {
            margin-top: 25px;
            margin-bottom: 20px;
        }

        .info table {
            width: 100%;
        }

        .info td {
            padding: 4px 0;
            font-size: 13px;
        }

        table.main {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
        }

        table.main th,
        table.main td {
            border: 1px solid #000;
            padding: 9px;
        }

        table.main th {
            background: #efefef;
            text-align: center;
            font-weight: bold;
        }

        table.main td:nth-child(1),
        table.main td:nth-child(3),
        table.main td:nth-child(4) {
            text-align: center;
        }

        table.main td:nth-child(2) {
            text-align: left;
        }

        .note {
            margin-top: 20px;
            border-top: 1px solid #000;
            padding-top: 10px;
        }

        .note strong {
            display: block;
            margin-bottom: 5px;
        }

        .footer {
            margin-top: 50px;
        }

        .signature {
            width: 100%;
        }

        .signature td {
            width: 50%;
            text-align: center;
            vertical-align: top;
        }

        .space {
            height: 70px;
        }

        @media print {

            body {
                margin: 10px;
            }

            .no-print {
                display: none;
            }

        }
    </style>

</head>

<body>

    <div class="header">

        <h1>NEATS CONTROL CENTER</h1>

        <h2>MATERIAL REQUEST</h2>

        <p>NCC OS - Warehouse Control System</p>

    </div>


    <div class="info">

        <table>

            <tr>
                <td width="150"><strong>No MR</strong></td>
                <td>: {{ $mr->nomor_mr }}</td>
            </tr>

            <tr>
                <td><strong>No SPK</strong></td>
                <td>: {{ $mr->productionOrder->nomor_spk ?? '-' }}</td>
            </tr>

            <tr>
                <td><strong>Product</strong></td>
                <td>: {{ $mr->productionOrder->product->nama ?? '-' }}</td>
            </tr>

            <tr>
                <td><strong>Tanggal</strong></td>
                <td>: {{ \Carbon\Carbon::parse($mr->tanggal)->format('d-m-Y') }}</td>
            </tr>

            <tr>
                <td><strong>Status</strong></td>
                <td>: {{ $mr->status }}</td>
            </tr>

        </table>

    </div>


    <table class="main">

        <thead>

            <tr>

                <th width="6%">No</th>

                <th>Material</th>

                <th width="20%">Qty Request</th>

                <th width="20%">Approved</th>

            </tr>

        </thead>

        <tbody>

            @foreach($mr->details as $i => $detail)

                <tr>

                    <td>{{ $i+1 }}</td>

                    <td>
                        {{ $detail->material->nama ?? '-' }}
                    </td>

                    <td>

                        {{ rtrim(rtrim(number_format($detail->qty_request,4,'.',''),'0'),'.') }}

                        {{ $detail->satuan }}

                    </td>

                    <td>

                        @if($detail->qty_approved>0)

                            {{ rtrim(rtrim(number_format($detail->qty_approved,4,'.',''),'0'),'.') }}

                            {{ $detail->satuan }}

                        @else

                            -

                        @endif

                    </td>

                </tr>

            @endforeach

        </tbody>

    </table>


    @if(!empty($mr->catatan))

        <div class="note">

            <strong>NB :</strong>

            {{ $mr->catatan }}

        </div>

    @endif


    <div class="footer">

        <table class="signature">

            <tr>

                <td>

                    <strong>Dibuat Oleh</strong>

                    <div class="space"></div>

                    @if($mr->creator)

                        {{ $mr->creator->name }}

                    @else

                        ______________________

                    @endif

                </td>

                <td>

                    <strong>Disetujui Gudang</strong>

                    <div class="space"></div>

                    @if($mr->approver)

                        {{ $mr->approver->name }}

                    @else

                        ______________________

                    @endif

                </td>

            </tr>

        </table>

    </div>

    <script>

        window.print();

    </script>

</body>

</html>